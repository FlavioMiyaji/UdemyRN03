import React, { useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../../models';
import { addToCard } from '../../store/actions/CartActions';
import { ProductItem, HeaderButton } from '../../components';
import { Styles, Colors } from '../../constants';
import { fetchProducts } from '../../store/actions/ProductsActions';

const ProductsOverviewScreen = (props: any) => {
    const products: Product[] = useSelector((state: any) => state.productsReducer.availableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const viewDetailsHandler = (product: Product) => (
        props.navigation.navigate('ProductDetail', {
            productId: product.id,
            productTitle: product.title,
        })
    );

    return (
        <FlatList
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
    screen: {
        ...Styles.screen,
        flex: 0,
        flexGrow: 1,
    },
});

export default ProductsOverviewScreen;
