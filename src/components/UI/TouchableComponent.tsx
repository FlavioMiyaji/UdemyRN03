import React from 'react';
import {
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';

const TouchableComponent = (props: any) => {
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        return <TouchableNativeFeedback {...props} />;
    }
    return <TouchableOpacity {...props} />;
};

export default TouchableComponent;