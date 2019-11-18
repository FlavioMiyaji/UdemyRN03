import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../../constants';

const OrderScreen = (props: any) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>OrderScreen is not ready yet.</Text>
        </View>
    );
};

OrderScreen.navigationOptions = {
    headerTitle: 'OrderScreen',
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

export default OrderScreen;
