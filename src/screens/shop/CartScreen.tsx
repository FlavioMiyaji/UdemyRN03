import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../../constants';

const CartScreen = (props: any) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>CartScreen is not ready yet.</Text>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'CartScreen',
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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

export default CartScreen;
