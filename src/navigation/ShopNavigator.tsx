import { createAppContainer } from 'react-navigation';
import {
    createStackNavigator,
    NavigationStackOptions,
} from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Colors } from '../constants';
import {
    ProductsOverviewScreen,
    ProductDetailScreen,
} from '../screens/shop';

const defaultNavOptions: NavigationStackOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.background,
    },
    headerTintColor: Platform.OS === 'android' ? Colors.onPrimary : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
);

export default createAppContainer(ProductsNavigator);
