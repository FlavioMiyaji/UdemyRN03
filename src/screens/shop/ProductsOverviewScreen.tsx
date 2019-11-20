import React from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Styles } from '../../constants';
import { Product } from '../../models';
import { addToCard } from '../../store/actions/CartActions';
import { ProductItem, HeaderButton } from '../../components';

const ProductsOverviewScreen = (props: any) => {
    const products: Product[] = useSelector((state: any) => state.productsReducer.availableProducts);
    const dispatch = useDispatch();

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
                    onAddToCart={() => (
                        dispatch(addToCard(item))
                    )}
                />
            )}
        />
    );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }: any) => {
    return {
        headerTitle: 'All Products',
        headerRight: <HeaderButton
            iconName="shopping-cart"
            onPress={() => {
                navigation.navigate('Cart');
            }}
        />
    };
};

const styles = StyleSheet.create({
    screen: {
        ...Styles.screen,
        flex: 0,
    },
});

export default ProductsOverviewScreen;
