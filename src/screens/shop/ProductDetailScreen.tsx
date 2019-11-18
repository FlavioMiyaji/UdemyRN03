import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../../constants';

const ProductDetailScreen = (props: any) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>ProductDetailScreen is not ready yet.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: Fonts.bold,
        color: Colors.onBackground,
        textAlign: 'center',
    },
});

export default ProductDetailScreen;
