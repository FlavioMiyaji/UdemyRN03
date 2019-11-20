import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Colors, Fonts, Styles } from '../../constants';

const EditProductScreen = (props: any) => {
    return (
        <View style={Styles.screen}>
            <Text style={styles.title}>EditProductScreen is not ready yet.</Text>
        </View>
    );
};

EditProductScreen.navigationOptions = {
    headerTitle: 'EditProductScreen',
};

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.bold,
        color: Colors.onBackground,
        textAlign: 'center',
    },
});

export default EditProductScreen;
