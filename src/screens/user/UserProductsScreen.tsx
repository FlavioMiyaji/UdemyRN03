import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Colors, Fonts, Styles } from '../../constants';

const UserProductsScreen = (props: any) => {
    return (
        <View style={Styles.screen}>
            <Text style={styles.title}>UserProductsScreen is not ready yet.</Text>
        </View>
    );
};

UserProductsScreen.navigationOptions = {
    headerTitle: 'UserProductsScreen',
};

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.bold,
        color: Colors.onBackground,
        textAlign: 'center',
    },
});

export default UserProductsScreen;
