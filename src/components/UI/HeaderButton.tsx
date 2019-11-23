import React from 'react';
import {
    View,
    Platform,
    StyleSheet,
} from 'react-native';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants';
import { TouchableComponent } from '../';

const HeaderButton = (props: any) => {
    return (
        <TouchableComponent
            onPress={props.onPress}
            useForeground
        >
            <View
                style={styles.iconContainer}
            >
                <Icon
                    solid={props.solid}
                    color={Platform.OS === 'android' ? Colors.onPrimary : Colors.primary}
                    name={props.iconName}
                    size={24}
                />
            </View>
        </TouchableComponent>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        marginHorizontal: 5,
        padding: 15,
        borderRadius: 30,
        overflow: 'hidden',
    },
});

export default HeaderButton;
