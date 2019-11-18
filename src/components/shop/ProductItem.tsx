import React from 'react';
import {
    View,
    Text,
    Image,
    Button,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import { Colors, Fonts } from '../../constants';

const ProductItem = (props: any) => {
    let MyTouchable: any = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        MyTouchable = TouchableNativeFeedback;
    }
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <MyTouchable
                    onPress={props.onViewDetails}
                    useForeground
                >
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: props.image }}
                        />
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <Button
                                color={Colors.primary}
                                title="View Details"
                                onPress={props.onViewDetails}
                            />
                            <Button
                                color={Colors.primary}
                                title="To Cart"
                                onPress={props.onAddToCart}
                            />
                        </View>
                    </View>
                </MyTouchable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        backgroundColor: Colors.surface,
        shadowColor: Colors.onSurface,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        height: 300,
        margin: 10,
        borderRadius: 10,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '65%',
    },
    details: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
    },
    title: {
        fontSize: 18,
        color: Colors.onSurface,
        fontFamily: Fonts.bold,
    },
    price: {
        fontSize: 14,
        color: Colors.onSurface,
        fontFamily: Fonts.regular,
    },
    buttons: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
    },
});

export default ProductItem;
