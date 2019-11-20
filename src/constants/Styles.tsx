import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '.';

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'stretch',
        padding: 10,
    },
    textContainer: {
        backgroundColor: Colors.onBackground,
    },
    text: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: Colors.onBackground,
    },
    elevation: {
        backgroundColor: Colors.surface,
        shadowColor: Colors.onSurface,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
    },
});

export default Styles;