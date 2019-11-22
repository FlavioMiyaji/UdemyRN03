import React from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
} from 'react-native';
import {
    Fonts,
    Colors,
    Styles,
} from '../../constants';
import { TouchableComponent } from '../';

const ProductItem = (props: any) => {
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent
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
                                title="Add to Cart"
                                onPress={props.onAddToCart}
                            />
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        ...Styles.elevation,
        height: 230,
        margin: 10,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '60%',
    },
    details: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
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
