import React from 'react';
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Styles } from '../../constants';
import { Product } from '../../models';
import { ProductItem, HeaderButton } from '../../components';
import { deleteProduct } from '../../store/actions/ProductsActions';

const UserProductsScreen = (props: any) => {
    const userProducts = useSelector(({ productsReducer }: any) => productsReducer.userProducts);
    const dispatch = useDispatch();

    const editHandler = (product: Product) => {
        props.navigation.navigate('EditProduct', {
            productId: product.id,
        })
    };

    const deleteHandler = (product: Product) => {
        Alert.alert(
            'Confirmation',
            'Do you really want to delete this item?\nThis action cannot be undone.',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => (
                        dispatch(deleteProduct(product))
                    )
                },
            ]
        );
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
                            deleteHandler(item)
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
