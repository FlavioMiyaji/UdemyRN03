import React from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants';
import { Product } from '../../models';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props: any) => {
    const products: Product[] = useSelector((state: any) => state.productsReducer.availableProducts);
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
                    onViewDetails={() => {
                        props.navigation.navigate('ProductDetail', {
                            productId: item.id,
                            productTitle: item.title,
                        });
                    }}
                    onAddToCart={() => { }}
                />
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
    },
});

export default ProductsOverviewScreen;
