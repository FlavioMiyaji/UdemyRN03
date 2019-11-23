import React from 'react';
import {
    FlatList, Text, StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Styles, Colors } from '../../constants';
import { Order } from '../../models';
import { OrderItem, HeaderButton } from '../../components';

const OrderScreen = (props: any) => {
    const orders = useSelector(({ ordersReducer }: any) => ordersReducer.orders);
    return (
        <FlatList
            keyExtractor={({ id }: Order) => String(id)}
            contentContainerStyle={styles.screen}
            data={orders}
            renderItem={({ item: order }) => (
                <OrderItem order={order} />
            )}
        />
    );
};

OrderScreen.navigationOptions = ({ navigation }: any) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: (<HeaderButton
            iconName="bars"
            onPress={() => {
                navigation.toggleDrawer();
            }}
        />),
    };
};

const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
});

export default OrderScreen;
