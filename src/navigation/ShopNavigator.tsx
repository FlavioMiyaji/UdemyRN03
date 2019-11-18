import { createAppContainer } from 'react-navigation';
import {
    createStackNavigator,
    NavigationStackOptions,
} from 'react-navigation-stack';
import { Platform } from 'react-native';
import { ProductsOverviewScreen } from '../screens/shop';
import { Colors } from '../constants';

const defaultNavOptions: NavigationStackOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.background,
    },
    headerTintColor: Platform.OS === 'android' ? Colors.onPrimary : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
);

export default createAppContainer(ProductsNavigator);
