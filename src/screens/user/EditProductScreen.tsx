import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, Fonts, Styles } from '../../constants';
import { Product } from '../../models';

const EditProductScreen = (props: any) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct: Product = useSelector((state: any) =>
        state.productsReducer.availableProducts.find(({ id }: Product) => id === productId)
    );
    return (
        <View style={Styles.screen}>
            <Text style={styles.title}>EditProductScreen is not ready yet.</Text>
        </View>
    );
};

EditProductScreen.navigationOptions = ({ navigation }: any) => {
    const productTitle = navigation.getParam('productTitle');
    return {
        headerTitle: productTitle ? `Editing: ${productTitle}` : 'Adding',
    };
};

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.bold,
        color: Colors.onBackground,
        textAlign: 'center',
    },
});

export default EditProductScreen;
