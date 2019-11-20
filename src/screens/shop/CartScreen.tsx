import React from 'react';
import {
    Text,
    View,
    Button,
    FlatList,
    StyleSheet,
    ListRenderItem,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Fonts, Styles } from '../../constants';
import { CartItem } from '../../models';
import { CartItem as Item } from '../../components';
import { removeFromCard } from '../../store/actions/CartActions';

const CartScreen = (props: any) => {
    const items: CartItem[] = useSelector((state: any) => state.cartReducer.items);
    const totalAmount: number = useSelector((state: any) => state.cartReducer.totalAmount);
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}<Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    title="Order Now"
                    color={Colors.primary}
                    onPress={() => { }}
                />
            </View>
            <FlatList
                contentContainerStyle={{ padding: 10 }}
                keyExtractor={({ productId }: CartItem) => (productId)}
                data={items}
                renderItem={({ item }) => (
                    <Item
                        quantity={item.quantity}
                        productPrice={item.productPrice}
                        productTitle={item.productTitle}
                        sum={item.sum}
                        onPress={() => {
                            dispatch(removeFromCard(item.productId))
                        }}
                    />
                )}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Cart',
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Styles.screen.backgroundColor,
    },
    summary: {
        ...Styles.elevation,
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
});

export default CartScreen;
