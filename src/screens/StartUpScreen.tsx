import React, {
    useEffect
} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native';
import {
    NavigationState,
    NavigationParams,
    NavigationScreenProp,
} from 'react-navigation';
import { useDispatch } from 'react-redux';
import {
    Colors,
    Styles,
} from '../constants';
import { UserData, authenticate } from '../store/actions/AuthActions';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const StartUpScreen = (props: Props) => {
    const { navigation: { navigate } } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData: string | null = await AsyncStorage.getItem('userData');
            if (!userData) {
                navigate('Auth');
                return;
            }
            const transformedData: UserData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            if (!token || !userId || new Date(expiryDate) <= new Date()) {
                navigate('Auth');
                return;
            }
            navigate('Shop');
            dispatch(authenticate(transformedData));
        };
        tryLogin();
    }, [navigate, dispatch]);
    return (
        <View style={styles.screen}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        ...Styles.screen,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StartUpScreen;