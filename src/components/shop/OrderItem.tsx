import React, { useState } from 'react';
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
import { Order, CartItem } from '../../models';
import { CartItem as CartItemComp } from '../../components';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';
import TouchableComponent from '../UI/TouchableComponent';

const OrderItem = (props: any) => {
    const [showDetails, setShowDetails] = useState(false);
    const order: Order = props.order;
    const { totalAmount, readableDate, items = [] } = order;
    return (
        <View style={styles.order}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${(totalAmount ? totalAmount : 0).toFixed(2)}</Text>
                <Text style={styles.date}>{readableDate}</Text>
            </View>
            {(!!items && items.length > 0) && (
                <TouchableComponent
                    onPress={() => (
                        setShowDetails(prevState => !prevState)
                    )}
                >
                    <View>
                        <View style={styles.detailsTouchable}>
                            <Text style={styles.detailsText}>{showDetails ? 'Hide Details' : 'Show Details'}</Text>
                            <Icon
                                color={Colors.primary}
                                name={showDetails ? 'chevron-up' : 'chevron-down'}
                                size={20}
                            />
                        </View>
                        {showDetails && (
                            items.map((cartItem: CartItem) => (
                                <CartItemComp
                                    key={cartItem.product.id}
                                    product={cartItem.product}
                                    quantity={cartItem.quantity}
                                    sum={cartItem.sum}
                                />
                            ))
                        )}
                    </View>
                </TouchableComponent>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    order: {
        ...Styles.elevation,
        padding: 5,
        borderBottomColor: Colors.surface,
        borderBottomWidth: 1,
        marginBottom: 20,
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
    detailsTouchable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsText: {
        ...Styles.text,
        color: Colors.primary,
        textDecorationLine: 'underline',
    },
});

export default OrderItem;
