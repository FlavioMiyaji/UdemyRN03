import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
} from 'react-native';
import {
    Fonts,
    Colors,
    Styles,
} from '../../constants';
import { Order } from 'src/models';

const OrderItem = (props: any) => {
    const item: Order = props.item;
    return (
        <View style={styles.order}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${(item.totalAmount ? item.totalAmount : 0).toFixed(2)}</Text>
                <Text style={styles.date}>{item.readableDate}</Text>
            </View>
            <Button
                color={Colors.primary}
                title="Show Details"
                onPress={() => {
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    order: {
        padding: 5,
        borderBottomColor: Colors.surface,
        borderBottomWidth: 1,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalAmount: {
        ...Styles.text,
        fontFamily: Fonts.bold,
    },
    date: {
        ...Styles.text,
        color: Colors.desabled,
    },
});

export default OrderItem;
