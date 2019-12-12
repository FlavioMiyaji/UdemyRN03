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
    Image,
    Modal,
    Button,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    ImageSourcePropType,
} from 'react-native';
import {
    ScrollView,
    NavigationState,
    NavigationParams,
    NavigationScreenProp,
} from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { useSelector, useDispatch } from 'react-redux';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Product } from '../../models';
import { addToCard } from '../../store/actions/CartActions';
import {
    ProductItem,
    HeaderButton,
    TouchableComponent,
} from '../../components';
import { Styles, Colors } from '../../constants';
import { fetchProducts } from '../../store/actions/ProductsActions';
import { ReducersState as S } from '../../App';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const renderInfo = (props: {
    showIntro: boolean;
    setShowIntro: (showIntro: boolean) => void;
}) => {
    return (
        <TouchableComponent
            onPress={() => {
                props.setShowIntro(true);
            }}
        >
            <View style={{
                position: 'absolute',
                top: 10,
                left: 10,
                padding: 10,
                borderRadius: 30,
            }}>
                <Icon
                    color={Colors.onBackground}
                    name="info-circle"
                    size={20}
                />
                {renderSlide(props)}
            </View>
        </TouchableComponent>
    );
}

const renderSlide = ({ showIntro, setShowIntro }: {
    showIntro: boolean;
    setShowIntro: (showIntro: boolean) => void;
}) => {
    return (
        <Modal
            visible={showIntro}
            transparent
        >

            <AppIntroSlider
                renderItem={({ item }) => {
                    return renderSlideItem({ item, setShowIntro });
                }}
                slides={slides}
                showPrevButton
                onDone={() => {
                    setShowIntro(false);
                }}
                doneLabel="Fim"
                nextLabel="Proximo"
                prevLabel="Anterior"
            />
        </Modal>
    );
};

const renderSlideItem = ({ item, setShowIntro }: {
    item: {
        key: string;
        title: string;
        image: ImageSourcePropType;
        text: string;
        backgroundColor: string;
    },
    setShowIntro: (showIntro: boolean) => void,
}) => {
    return (
        <View
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', }}
        >
            <TouchableComponent
                onPress={() => {
                    setShowIntro(false);
                }}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    padding: 10,
                    borderRadius: 30,
                }}>
                    <Icon
                        color="white"
                        name="times-circle"
                        size={20}
                    />
                </View>
            </TouchableComponent>
            <ScrollView
                style={{
                    flex: 1,
                    marginTop: 60,
                    marginBottom: 70,
                }}
                contentContainerStyle={styles.slide}
            >
                <View style={styles.imageContainer}>
                    <Image
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                        source={item.image}
                    />
                </View>
                <View style={styles.slideContainer}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const slides = [
    {
        key: 'slide01',
        title: 'Adding Products',
        text: '1 - Add some products to your cart.\n2 - See you "Cart".',
        image: require('../../assets/slides/01.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'slide02',
        title: 'Finishing Order',
        text: '3 - You can remove some product from you cart.\n4 - Then finish your "Order Now".',
        image: require('../../assets/slides/02.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 'slide03',
        title: 'See Orders 1/3',
        text: '5 - Back on the list of products, open the "Menu".',
        image: require('../../assets/slides/03.png'),
        backgroundColor: '#22bcb5',
    },
    {
        key: 'slide04',
        title: 'See Orders 2/3',
        text: '6 - Open "Your Orders"',
        image: require('../../assets/slides/04.png'),
        backgroundColor: '#22bcb5',
    },
    {
        key: 'slide05',
        title: 'See Orders 3/3',
        text: '7 - Here\'s the list of orders.',
        image: require('../../assets/slides/05.png'),
        backgroundColor: '#22bcb5',
    },
];

const ProductsOverviewScreen = (props: Props) => {
    const [showIntro, setShowIntro] = useState(false);
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState();
    const products: Product[] = useSelector(({ productsState }: S) => productsState.availableProducts);
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
                {renderInfo({ showIntro, setShowIntro })}
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
                {renderInfo({ showIntro, setShowIntro })}
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
            {renderInfo({ showIntro, setShowIntro })}
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
    slide: {
        flexGrow: 1,
        alignItems: 'center',
    },
    slideContainer: {
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    title: {
        ...Styles.title,
        color: 'white',
    },
    text: {
        ...Styles.text,
        textAlign: 'center',
        color: 'white',
    },
    imageContainer: {
        width: '100%',
        height: 300,
    },
});

export default ProductsOverviewScreen;
