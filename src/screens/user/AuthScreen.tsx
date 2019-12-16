import React, {
    useState,
    useReducer,
    useCallback,
} from 'react';
import {
    View,
    Button,
    StyleSheet,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    Modal,
    ActivityIndicator,
} from 'react-native';
import {
    NavigationState,
    NavigationParams,
    NavigationScreenProp,
} from 'react-navigation';
import { useDispatch } from 'react-redux';
import { Input } from '../../components';
import { Colors, Styles } from '../../constants';
import { singup, login } from '../../store/actions/AuthActions';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const FORM_UPDATE = 'FORM_UPDATE';

interface InputValues {
    email: string;
    password: string;
}

interface InputValids {
    email: boolean;
    password: boolean;
}

interface State {
    inputValues: InputValues;
    inputValids: InputValids;
    formValid: boolean;
}

type Action =
    | { type: 'FORM_UPDATE', payload: { id: string, value: string, valid: boolean } }
    ;

const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case FORM_UPDATE: {
            const { payload: { id, value, valid } } = action;
            const inputValues: InputValues = { ...state.inputValues, [id]: value };
            const inputValids: InputValids = { ...state.inputValids, [id]: valid };
            let formValid = inputValids.email
                && inputValids.password
                ;
            return {
                ...state,
                inputValues,
                inputValids,
                formValid,
            };
        }
        default: state;
    }
};

const initFormState = {
    inputValues: {
        email: '',
        password: '',
    },
    inputValids: {
        email: false,
        password: false,
    },
    formValid: false,
};

const AuthScreen = (props: Props) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(
        formReducer,
        { ...initFormState }
    );

    const inputChangeHandler = useCallback(({ id, value, valid }: {
        id: string;
        value: string;
        valid: boolean;
    }) => {
        dispatchFormState({
            type: FORM_UPDATE,
            payload: { id, value, valid }
        });
    }, [dispatchFormState]);


    const submitHandler = useCallback(async () => {
        Keyboard.dismiss();
        setLoading(true);
        if (!formState.formValid) {
            setLoading(false);
            Alert.alert(
                'Wrong input!',
                'Please check the errors in the form.',
                [
                    { text: 'Okay' },
                ],
            );
            return;
        }
        const { email, password } = formState.inputValues;
        try {
            let action;
            if (signup) {
                action = singup(email, password);
            } else {
                action = login(email, password);
            }
            await dispatch(action);
            navigation.navigate('Shop');
        } catch (error) {
            Alert.alert("ERROR", error.message);
            setLoading(false);
        }
    }, [
        dispatch,
        formState,
        signup,
    ]);

    const singupHandler = () => {
        setSignup(prevState => !prevState);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <Modal
                visible={loading}
                transparent
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }}>
                    <ActivityIndicator
                        size="large"
                        color={Colors.primary}
                    />
                </View>
            </Modal>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    style={styles.screen}
                    source={require('../../assets/images/colors.jpg')}
                    resizeMode="cover"
                >
                    <View style={styles.authContainer}>
                        <Input
                            id="email"
                            label="E-Mail"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            keyboardType="email-address"
                            initValue=""
                            initValid={false}
                        />
                        <Input
                            id="password"
                            label="Password"
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password address."
                            onInputChange={inputChangeHandler}
                            initValue=""
                            initValid={false}
                            secureTextEntry
                        />
                        <View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title={signup ? 'Sign Up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={submitHandler}
                                    disabled={loading}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title={signup ? 'Switch to Login' : 'Switch to Sign Up'}
                                    color={Colors.secondaryVariant}
                                    onPress={singupHandler}
                                    disabled={loading}
                                />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView >
    );
};

AuthScreen.navigationOptions = ({ navigation }: NavigationOptionsProps) => {
    return {
        headerTitle: 'Authenticate',
    };
};

const styles = StyleSheet.create({
    screen: {
        ...Styles.screen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        ...Styles.card,
        width: '80%',
        maxWidth: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 15,
    }
});

export default AuthScreen;
