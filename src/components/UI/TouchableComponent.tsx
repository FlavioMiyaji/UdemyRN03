import React from 'react';
import {
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableNativeFeedbackProps, TouchableOpacityProps {
    children: Element;
}

const TouchableComponent = (props: Props) => {
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        return <TouchableNativeFeedback {...props} />;
    }
    return <TouchableOpacity {...props} />;
};

export default TouchableComponent;