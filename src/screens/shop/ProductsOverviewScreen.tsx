import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../../models';
import { addToCard } from '../../store/actions/CartActions';
import { ProductItem, HeaderButton } from '../../components';
import { Styles, Colors } from '../../constants';
import { fetchProducts } from '../../store/actions/ProductsActions';

const ProductsOverviewScreen = (props: any) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState();
    const products: Product[] = useSelector((state: any) => state.productsReducer.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setRefreshing(true);
        try {
            await dispatch(fetchProducts());
        } catch (error) {
            setError(error.message);
        }
        setRefreshing(false);
    }, [dispatch, setRefreshing, setError]);

    useEffect(() => {
        const willFocus = navigation.addListener('willFocus', loadProducts);
        return () => (
            willFocus.remove()
        );
    }, [navigation, loadProducts]);

    useEffect(() => {
        setLoading(true);
        loadProducts().then(() => {
            setLoading(false);
        });
    }, [dispatch, loadProducts]);

    const viewDetailsHandler = (product: Product) => (
        navigation.navigate('ProductDetail', {
            productId: product.id,
            productTitle: product.title,
        })
    );
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>{`An error ocurred!\n${error}`}</Text>
                <Button
                    title="Try again"
                    onPress={loadProducts}
                />
            </View>
        );
    }
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                />
            </View>
        );
    }
    if (!products || products.length <= 0) {
        return (
            <View style={styles.centered}>
                <Text style={Styles.text}>No products found. Maybe start adding some.</Text>
            </View>
        );
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={refreshing}
            keyExtractor={({ id }: Product) => (id)}
            contentContainerStyle={styles.screen}
            data={products}
            renderItem={({ item }) => (
                <ProductItem
                    image={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => (
                        viewDetailsHandler(item)
                    )}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => (
                            viewDetailsHandler(item)
                        )}
                    />
                    <Button
                        color={Colors.primary}
                        title="Add to Cart"
                        onPress={() => (
                            dispatch(addToCard(item))
                        )}
                    />
                </ProductItem>
            )}
        />
    );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }: any) => {
    return {
        headerTitle: 'All Products',
        headerLeft: (<HeaderButton
            iconName="bars"
            onPress={() => {
                navigation.toggleDrawer();
            }}
        />),
        headerRight: (<HeaderButton
            iconName="shopping-cart"
            onPress={() => {
                navigation.navigate('Cart');
            }}
        />),
    };
};

const styles = StyleSheet.create({
    centered: {
        ...Styles.screen,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    screen: {
        ...Styles.screen,
        flex: 0,
        flexGrow: 1,
    },
    error: {
        ...Styles.text,
        color: Colors.error,
        marginBottom: 15,
    },
});

export default ProductsOverviewScreen;
