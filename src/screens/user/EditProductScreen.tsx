import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../../constants';

const EditProductScreen = (props: any) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>EditProductScreen is not ready yet.</Text>
        </View>
    );
};

EditProductScreen.navigationOptions = {
    headerTitle: 'EditProductScreen',
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

export default EditProductScreen;
