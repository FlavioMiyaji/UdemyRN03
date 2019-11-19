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
    CartScreen,
} from '../screens';

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
        Cart: CartScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
);

export default createAppContainer(ProductsNavigator);
