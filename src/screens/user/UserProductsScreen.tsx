import React, {
    RefObject,
    createRef,
} from 'react';
import {
    View,
    Text,
    Alert,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';
import {
    NavigationState,
    NavigationParams,
    NavigationScreenProp,
} from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Styles } from '../../constants';
import { Product } from '../../models';
import { ProductItem, HeaderButton } from '../../components';
import { deleteProduct } from '../../store/actions/ProductsActions';
import { ReducersState as S } from '../../App';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const UserProductsScreen = (props: Props) => {
    const toastRef: RefObject<Toast> = createRef();
    const userProducts = useSelector(({ productsState }: S) => productsState.userProducts);
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
                    onPress: () => {
                        dispatch(deleteProduct(product));
                        if (toastRef.current) {
                            toastRef.current.show(`The product was deleted!`);
                        }
                    },
                },
            ]
        );
    };
    if (!userProducts || userProducts.length <= 0) {
        return (
            <View style={styles.centered}>
                <Text style={Styles.text}>No products found. Maybe start adding some.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Toast ref={toastRef} />
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
        </View>
    );
};

UserProductsScreen.navigationOptions = ({ navigation }: NavigationOptionsProps) => {
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
});

export default UserProductsScreen;
