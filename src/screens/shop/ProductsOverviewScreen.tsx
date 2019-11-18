import React from 'react';
import {
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, Fonts } from '../../constants';
import { Product } from '../../models';

const ProductsOverviewScreen = (props: any) => {
    const products: Product[] = useSelector((state: any) => state.productsReducer.availableProducts);
    return (
        <FlatList
            keyExtractor={({ id }: Product) => (id)}
            contentContainerStyle={styles.screen}
            data={products}
            renderItem={({ item }) => (
                <Text style={styles.title}>
                    {item.title}
                </Text>
            )}
        />
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
};

const styles = StyleSheet.create({
    screen: {
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

export default ProductsOverviewScreen;
