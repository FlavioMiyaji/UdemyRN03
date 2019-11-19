import React from 'react';
import {
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants';

const HeaderButton = (props: any) => {
    let TouchableComp: any = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    return (
        <TouchableComp
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
                    size={20}
                />
            </View>
        </TouchableComp>
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
