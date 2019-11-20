import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Colors, Fonts, Styles } from '../../constants';

const OrderScreen = (props: any) => {
    return (
        <View style={Styles.screen}>
            <Text style={styles.title}>OrderScreen is not ready yet.</Text>
        </View>
    );
};

OrderScreen.navigationOptions = {
    headerTitle: 'OrderScreen',
};

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.bold,
        color: Colors.onBackground,
        textAlign: 'center',
    },
});

export default OrderScreen;
