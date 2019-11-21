import { createAppContainer } from 'react-navigation';
import {
    createStackNavigator,
    NavigationStackOptions,
} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Colors, Fonts } from '../constants';
import {
    ProductsOverviewScreen,
    ProductDetailScreen,
    CartScreen,
    OrderScreen,
} from '../screens';

const defaultNavOptions: NavigationStackOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.background,
    },
    headerTitleStyle: {
        fontFamily: Fonts.bold,
    },
    headerBackTitleStyle: {
        fontFamily: Fonts.regular,
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

const OrdersNavigator = createStackNavigator(
    {
        Order: OrderScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
    },
    {
        drawerBackgroundColor: Colors.background,
        contentOptions: {
            activeBackgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.background,
            activeTintColor: Platform.OS === 'android' ? Colors.onPrimary : Colors.primary,
            inactiveBackgroundColor: Platform.OS === 'android' ? Colors.primaryVariant : Colors.background,
            inactiveTintColor: Platform.OS === 'android' ? Colors.onPrimaryVariant : Colors.primaryVariant,
            itemsContainerStyle: {
                flex: 1,
                backgroundColor: Colors.surface,
            },
        },
    }
);

export default createAppContainer(ShopNavigator);
