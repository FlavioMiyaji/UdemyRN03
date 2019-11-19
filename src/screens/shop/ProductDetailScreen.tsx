import React from 'react';
import {
    Text,
    View,
    Image,
    Button,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Fonts, Styles } from '../../constants';
import { Product } from '../../models';
import { addToCard } from '../../store/actions/CartActions';

const ProductDetailScreen = (props: any) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct: Product = useSelector((state: any) =>
        state.productsReducer.availableProducts.find(({ id }: Product) => id === productId)
    );
    const dispatch = useDispatch();
    return (
        // <View style={styles.screen}>
        //     <Text style={styles.title}>{selectedProduct.title}</Text>
        // </View>
        <ScrollView
            contentContainerStyle={styles.screen}
        >
            <Image
                style={styles.image}
                source={{ uri: selectedProduct.imageUrl }}
            />
            <View style={styles.buttons}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => (
                        dispatch(addToCard(selectedProduct))
                    )}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = ({ navigation }: any) => {
    const productTitle = navigation.getParam('productTitle');
    return {
        headerTitle: productTitle,
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
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
});

export default ProductDetailScreen;
