import React, {
    useState,
    useCallback,
    useEffect,
} from 'react';
import {
    Text,
    View,
    Button,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import {
    NavigationScreenProp,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Styles, Colors } from '../../constants';
import { Order } from '../../models';
import { OrderItem, HeaderButton } from '../../components';
import { fetchOrders } from '../../store/actions/OrdersActions';
import { ReducersState } from '../../App';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const OrderScreen = (props: Props) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState();
    const orders = useSelector(({ ordersReducer }: ReducersState) => ordersReducer.orders);

    const dispatch = useDispatch();

    const loadOrders = useCallback(async () => {
        setError(null);
        setRefreshing(true);
        try {
            await dispatch(fetchOrders());
        } catch (error) {
            setError(error.message);
        }
        setRefreshing(false);
    }, [dispatch, setRefreshing, setError]);

    useEffect(() => {
        const willFocus = navigation.addListener('willFocus', loadOrders);
        return () => (
            willFocus.remove()
        );
    }, [navigation, loadOrders]);

    useEffect(() => {
        setLoading(true);
        loadOrders().then(() => {
            setLoading(false);
        });
    }, [dispatch, loadOrders]);
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>{`An error ocurred!\n${error}`}</Text>
                <Button
                    title="Try again"
                    onPress={loadOrders}
                />
            </View>
        );
    }
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                />
            </View>
        );
    }
    return (
        <FlatList
            onRefresh={loadOrders}
            refreshing={refreshing}
            keyExtractor={({ id }: Order) => String(id)}
            contentContainerStyle={styles.screen}
            data={orders}
            renderItem={({ item: order }) => (
                <OrderItem order={order} />
            )}
        />
    );
};

OrderScreen.navigationOptions = ({ navigation }: NavigationOptionsProps) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: (<HeaderButton
            iconName="bars"
            onPress={() => {
                navigation.toggleDrawer();
            }}
        />),
    };
};

const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
    centered: {
        ...Styles.screen,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    error: {
        ...Styles.text,
        color: Colors.error,
        marginBottom: 15,
    },
});

export default OrderScreen;
