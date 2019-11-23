import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Fonts,
    Colors,
    Styles,
} from '../../constants';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';
import { TouchableComponent } from '../';

const CartItem = (props: any) => {
    const { product, quantity, sum } = props;
    return (
        <View style={styles.product}>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <View style={styles.details}>
                    <Text style={styles.quantity}>{quantity.toFixed(2)}</Text>
                    <Text style={Styles.text}>${sum.toFixed(2)}</Text>
                </View>
            </View>
            {!!props.onRemove && (
                <TouchableComponent
                    onPress={props.onRemove}
                >
                    <View style={styles.touchable}>
                        <Icon
                            color={Colors.onPrimaryVariant}
                            name="trash"
                            size={20}
                        />
                    </View>
                </TouchableComponent>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        borderBottomColor: Colors.surface,
        borderBottomWidth: 1,
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
