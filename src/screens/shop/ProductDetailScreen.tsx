import React, {
    RefObject,
    createRef,
} from 'react';
import {
    Text,
    View,
    Image,
    Button,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    NavigationScreenProp,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { Colors, Fonts, Styles } from '../../constants';
import { Product } from '../../models';
import { addToCard } from '../../store/actions/CartActions';
import { ReducersState as S } from '../../App';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const ProductDetailScreen = (props: Props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct: Product | undefined = useSelector(({ productsState }: S) =>
        productsState.availableProducts.find(({ id }: Product) => id === productId)
    );
    const toastRef: RefObject<Toast> = createRef();
    const dispatch = useDispatch();
    if (!selectedProduct) {
        return (
            <View style={styles.centered}>
                <Text style={Styles.text}>No product found.</Text>
            </View>
        );
    }
    return (
        <ScrollView
            contentContainerStyle={styles.screen}
        >
            <Toast ref={toastRef} />
            <Image
                style={styles.image}
                source={{ uri: selectedProduct.imageUrl }}
            />
            <View style={styles.buttons}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(addToCard(selectedProduct));
                        if (toastRef.current) {
                            toastRef.current.show(`The ${selectedProduct.title} was add to the cart.`);
                        }
                    }}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = ({ navigation }: NavigationOptionsProps) => {
    const productTitle = navigation.getParam('productTitle');
    return {
        headerTitle: productTitle,
    };
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.background,
        alignItems: 'stretch',
        padding: 0,
        flexGrow: 1,
    },
    image: {
        backgroundColor: Colors.surface,
        width: '100%',
        height: 320,
    },
    buttons: {
        marginVertical: 10,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    price: {
        ...Styles.text,
        fontSize: 20,
        color: Colors.desabled,
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    description: {
        ...Styles.text,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    centered: {
        ...Styles.screen,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
});

export default ProductDetailScreen;
