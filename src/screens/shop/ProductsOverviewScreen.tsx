import React, {
    useState,
    useEffect,
    createRef,
    RefObject,
    useCallback,
} from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import {
    NavigationState,
    NavigationParams,
    NavigationScreenProp,
} from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../../models';
import { addToCard } from '../../store/actions/CartActions';
import { ProductItem, HeaderButton } from '../../components';
import { Styles, Colors } from '../../constants';
import { fetchProducts } from '../../store/actions/ProductsActions';
import { ReducersState } from '../../App';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const ProductsOverviewScreen = (props: Props) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState();
    const products: Product[] = useSelector(({ productsReducer }: ReducersState) => productsReducer.availableProducts);
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

    const toastRef: RefObject<Toast> = createRef();
    const viewDetailsHandler = (product: Product) => (
        navigation.navigate('ProductDetail', {
            productId: product.id,
            productTitle: product.title,
        })
    );
    const addCartHandler = (product: Product) => {
        dispatch(addToCard(product));
        if (toastRef.current) {
            toastRef.current.show(`The ${product.title} was add to the cart.`);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <Toast ref={toastRef} />
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
                                addCartHandler(item)
                            )}
                        />
                    </ProductItem>
                )}
            />
        </View>
    );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }: NavigationOptionsProps) => {
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
