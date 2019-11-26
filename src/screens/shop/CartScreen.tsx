import React, { useCallback, useState, useEffect } from 'react';
import {
    Text,
    View,
    Alert,
    Button,
    FlatList,
    Keyboard,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Fonts, Styles } from '../../constants';
import { CartItem } from '../../models';
import { CartItem as Item } from '../../components';
import { removeFromCard } from '../../store/actions/CartActions';
import { addOrder } from '../../store/actions/OrdersActions';

const CartScreen = (props: any) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const items: CartItem[] = useSelector((state: any) => state.cartReducer.items);
    const totalAmount: number = useSelector((state: any) => state.cartReducer.totalAmount);
    const dispatch = useDispatch();

    const sendOrderHandler = useCallback(async () => {
        Keyboard.dismiss();
        setError(null);
        setLoading(true);
        try {
            await dispatch(addOrder(items, totalAmount));
            navigation.goBack();
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }, [dispatch, setError, setLoading]);

    useEffect(() => {
        if (error) {
            Alert.alert(
                'An error ocurred!',
                error,
                [
                    {
                        text: 'Okay'
                    },
                ],
            );
        }
    }, [error]);

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    {'Total: '}<Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
                </Text>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={Colors.primary}
                    />
                ) : (
                        <Button
                            title="Order Now"
                            color={Colors.primary}
                            onPress={sendOrderHandler}
                        />
                    )}
            </View>
            <FlatList
                contentContainerStyle={{ padding: 10 }}
                keyExtractor={({ product: { id } }: CartItem) => (id)}
                data={items}
                renderItem={({ item }) => (
                    <Item
                        quantity={item.quantity}
                        product={item.product}
                        sum={item.sum}
                        onRemove={() => {
                            dispatch(removeFromCard(item.product.id))
                        }}
                    />
                )}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Styles.screen.backgroundColor,
    },
    summary: {
        ...Styles.cart,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 10,
    },
    summaryText: {
        ...Styles.text,
    },
    amount: {
        ...Styles.text,
        fontFamily: Fonts.bold,
        color: Colors.secondary,
    },
    centered: {
        ...Styles.screen,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
});

export default CartScreen;
