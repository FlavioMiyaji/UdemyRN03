import React from 'react';
import { createAppContainer } from 'react-navigation';
import {
    createStackNavigator,
    NavigationStackOptions,
} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, Text } from 'react-native';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';
import { Colors, Fonts, Styles } from '../constants';
import {
    ProductsOverviewScreen,
    ProductDetailScreen,
    CartScreen,
    OrderScreen,
} from '../screens';

const navOptions = (props: any) => {
    return {
        drawerLabel: ({ tintColor }: any) => (
            <Text
                style={{
                    ...Styles.title,
                    color: tintColor,
                    padding: 10,
                }}
            >{props.label}</Text>
        ),
        drawerIcon: ({ tintColor }: any) => <Icon
            solid
            color={tintColor}
            name={props.icon}
            size={20}
        />,
    };
};

const defaultNavOptions: NavigationStackOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.background,
    },
    headerTitleStyle: {
        ...Styles.title,
    },
    headerBackTitleStyle: {
        ...Styles.text,
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
        navigationOptions: navOptions({
            label: 'Products',
            icon: 'shopping-cart',
        }),
        defaultNavigationOptions: defaultNavOptions,
    }
);

const OrdersNavigator = createStackNavigator(
    {
        Order: OrderScreen,
    },
    {
        navigationOptions: navOptions({
            label: 'Your Orders',
            icon: 'list',
        }),
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
