import {
    Gray,
    BlueGray,
    Blue,
    Orange,
    Red,
} from './palettes';

const getValue = ({ luminosity }: any) => {
    const dark = {
        main: BlueGray.c800,
        variant: BlueGray.c500,
    };
    const light = {
        main: Gray.main,
        variant: Gray.c300,
    };
    const primary = {
        main: Blue.c600,
        variant: Blue.main,
    };
    const secondary = {
        main: Orange.c500,
        variant: Orange.c200,
    };
    const error = {
        main: Red.c500,
    };

    const theme = luminosity === 'dark' ? dark : light;
    return {
        colors: {
            // Backgrounds.
            background: theme.main.background,
            surface: theme.variant.background,
            error: error.main.background,
            primary: primary.main.background,
            primaryVariant: primary.variant.background,
            secondary: secondary.main.background,
            secondaryVariant: secondary.variant.background,

            // Foregrounds.
            onBackground: theme.main.foreground,
            onSurface: theme.variant.foreground,
            onError: error.main.foreground,
            onPrimary: primary.main.foreground,
            onPrimaryVariant: primary.variant.foreground,
            onSecondary: secondary.main.foreground,
            onSecondaryVariant: secondary.variant.foreground,

            desabled: 'grey',
        },
    };
};

const Colors = getValue({ luminosity: 'light' }).colors;

export default Colors;
