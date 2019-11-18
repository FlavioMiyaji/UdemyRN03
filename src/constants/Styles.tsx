import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '.';

const Styles = StyleSheet.create({
    textContainer: {
        backgroundColor: Colors.onBackground,
    },
    text: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: Colors.onBackground,
    },
});

export default Styles;