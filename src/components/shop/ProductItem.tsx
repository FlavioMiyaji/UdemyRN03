import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    GestureResponderEvent,
} from 'react-native';
import {
    Fonts,
    Colors,
    Styles,
} from '../../constants';
import { TouchableComponent } from '../';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';

interface Props {
    onSelect: (event: GestureResponderEvent) => void;
    image: string;
    title: string;
    price: number;
    children: Element;
}

const ProductItem = (props: Props) => {
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent
                    onPress={props.onSelect}
                    useForeground
                >
                    <View>
                        <ImageBackground
                            style={styles.imageContainer}
                            source={require('../../assets/images/photos.png')}
                            resizeMode="center"
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: props.image }}
                                fadeDuration={1000}
                            />
                        </ImageBackground>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttons}>
                            {props.children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        ...Styles.card,
        height: 230,
        margin: 10,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
    },
    imageBack: {
        width: '100%',
        height: '100%',
    },
    image: {
        zIndex: 1,
        width: '100%',
        height: '100%',
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
