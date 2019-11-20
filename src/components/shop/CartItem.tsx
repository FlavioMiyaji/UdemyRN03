import React from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import { Colors, Styles, Fonts } from '../../constants';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';

const CartItem = (props: any) => {
    let MyTouchable: any = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        MyTouchable = TouchableNativeFeedback;
    }
    return (
        <View style={styles.product}>
            <Text style={styles.productTitle}>{props.productTitle}</Text>
            <View style={styles.details}>
                <Text style={styles.quantity}>{props.quantity.toFixed(2)}</Text>
                <Text style={Styles.text}>${props.sum.toFixed(2)}</Text>
                <MyTouchable
                    onPress={props.onPress}
                >
                    <View style={styles.touchable}>
                        <Icon
                            color={Colors.onPrimaryVariant}
                            name="trash"
                            size={20}
                        />
                    </View>
                </MyTouchable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        padding: 5,
    },
    touchable: {
        ...Styles.elevation,
        backgroundColor: Colors.primaryVariant,
        padding: 10,
        overflow: 'hidden',
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantity: {
        ...Styles.text,
        color: Colors.desabled,
    },
    productTitle: {
        ...Styles.text,
        fontFamily: Fonts.bold,
    },
});

export default CartItem;
