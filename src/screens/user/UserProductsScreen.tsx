import React from 'react';
import {
    FlatList,
    StyleSheet,
    Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Fonts, Styles } from '../../constants';
import { Product } from '../../models';
import { ProductItem, HeaderButton } from '../../components';
import { deleteProduct } from '../../store/actions/ProductsActions';

const UserProductsScreen = (props: any) => {
    const userProducts = useSelector(({ productsReducer }: any) => productsReducer.userProducts);
    const dispatch = useDispatch();

    const editHandler = (product: Product) => {
        props.navigation.navigate('EditProduct', {
            productId: product.id,
            productTitle: product.title,
        })
    };
    return (
        <FlatList
            contentContainerStyle={styles.screen}
            data={userProducts}
            keyExtractor={(item: Product) => item.id}
            renderItem={({ item }) => (
                <ProductItem
                    image={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => (
                        editHandler(item)
                    )}
                >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => (
                            editHandler(item)
                        )}
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => (
                            dispatch(deleteProduct(item))
                        )}
                    />
                </ProductItem>
            )}
        />
    );
};

UserProductsScreen.navigationOptions = ({ navigation }: any) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: (
            <HeaderButton
                iconName="bars"
                onPress={() => (
                    navigation.toggleDrawer()
                )}
            />
        ),
        headerRight: (
            <HeaderButton
                iconName="plus"
                onPress={() => (
                    navigation.navigate('EditProduct')
                )}
            />
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        ...Styles.screen,
        flex: 0,
    },
});

export default UserProductsScreen;
