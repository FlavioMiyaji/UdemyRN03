import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, Fonts } from '../../constants';
import { Product } from '../../models';

const ProductDetailScreen = (props: any) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct: Product = useSelector((state: any) =>
        state.productsReducer.availableProducts.find(({ id }: Product) => id === productId)
    );
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{selectedProduct.title}</Text>
        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: Fonts.bold,
        color: Colors.onBackground,
        textAlign: 'center',
    },
});

export default ProductDetailScreen;
