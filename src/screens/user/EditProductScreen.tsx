import React, {
    useState,
    useCallback,
    useEffect,
    useReducer,
} from 'react';
import {
    View,
    Alert,
    Keyboard,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    GestureResponderEvent,
} from 'react-native';
import {
    NavigationScreenProp,
    NavigationState,
    NavigationParams,
} from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Styles, Colors } from '../../constants';
import { Product } from '../../models';
import { HeaderButton, Input } from '../../components';
import { updateProduct, createProduct } from '../../store/actions/ProductsActions';
import { ReducersState as S } from '../../App';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

interface NavigationOptionsProps {
    navigation: Navigation;
}

const FORM_UPDATE = 'FORM_UPDATE';

interface InputValues {
    title: string;
    imageUrl: string;
    price: string;
    description: string;
}

interface InputValids {
    title: boolean;
    imageUrl: boolean;
    price: boolean;
    description: boolean;
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
            let formValid = inputValids.title
                && inputValids.imageUrl
                && inputValids.price
                && inputValids.description
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

const initFormState = (selectedProduct: Product | undefined) => {
    return {
        inputValues: {
            title: selectedProduct ? selectedProduct.title : '',
            imageUrl: selectedProduct ? selectedProduct.imageUrl : '',
            price: '',
            description: selectedProduct ? selectedProduct.description : '',
        },
        inputValids: {
            title: selectedProduct ? true : false,
            imageUrl: selectedProduct ? true : false,
            price: selectedProduct ? true : false,
            description: selectedProduct ? true : false,
        },
        formValid: selectedProduct ? true : false,
    };
};

const EditProductScreen = (props: Props) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const productId = navigation.getParam('productId');
    let selectedProduct: Product | undefined = undefined;
    if (productId) {
        selectedProduct = useSelector(({ productsState }: S) =>
            productsState.availableProducts.find(({ id }: Product) => id === productId)
        );
    }
    const userId = useSelector(({ authState }: S) => (authState.userId));

    const [formState, dispatchFormState] = useReducer(
        formReducer,
        { ...initFormState(selectedProduct) }
    );

    const dispatch = useDispatch();
    const submitHandler = useCallback(() => {
        Keyboard.dismiss();
        setError(null);
        setLoading(true);
        setTimeout(async () => {
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
            const { title, imageUrl, price, description } = formState.inputValues;
            try {
                if (selectedProduct) {
                    await dispatch(
                        updateProduct({
                            ...selectedProduct,
                            title,
                            imageUrl,
                            description,
                        })
                    );
                } else {
                    await dispatch(
                        createProduct({
                            id: '',
                            ownerId: userId,
                            title,
                            imageUrl,
                            price: +price,
                            description,
                        })
                    );
                }
                navigation.goBack();
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        }, 1000);
    }, [
        dispatch,
        selectedProduct,
        formState,
    ]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

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

    useEffect(() => {
        if (error) {
            Alert.alert(
                'An error ocurred!',
                error,
                [
                    {
                        text: 'Okay'
                    },
                ],
            );
        }
    }, [error]);

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
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior="padding"
        //     keyboardVerticalOffset={100}
        // >
        <ScrollView
            contentContainerStyle={styles.form}
        >
            <View>
                <Input
                    id="title"
                    label="Title"
                    errorText="Please enter a valid title."
                    initValue={selectedProduct ? selectedProduct.title : ''}
                    initValid={!!selectedProduct}
                    onInputChange={inputChangeHandler}
                    required
                    maxLength={20}
                    autoCapitalize="sentences"
                    autoCorrect
                />
                <Input
                    id="imageUrl"
                    label="Image URL"
                    errorText="Please enter a valid image URL."
                    initValue={selectedProduct ? selectedProduct.imageUrl : ''}
                    initValid={!!selectedProduct}
                    onInputChange={inputChangeHandler}
                    maxLength={100}
                />
                {!selectedProduct && (
                    <Input
                        id="price"
                        label="Price"
                        errorText="Please enter a valid price."
                        initValue={''}
                        initValid={!!selectedProduct}
                        onInputChange={inputChangeHandler}
                        maxLength={10}
                        keyboardType="decimal-pad"
                        required
                        min={0.1}
                    />
                )}
                <Input
                    id="description"
                    label="Description"
                    errorText="Please enter a valid description."
                    initValue={selectedProduct ? selectedProduct.description : ''}
                    initValid={!!selectedProduct}
                    onInputChange={inputChangeHandler}
                    required
                    maxLength={100}
                    multiline
                    numberOfLines={3}
                    minLength={20}
                />
            </View>
        </ScrollView>
        // </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = ({ navigation }: NavigationOptionsProps) => {
    const productId = navigation.getParam('productId');
    const submit: (event: GestureResponderEvent) => void = navigation.getParam('submit');
    return {
        headerTitle: productId ? 'Editing' : 'Adding',
        headerRight: (
            <HeaderButton
                iconName="check"
                onPress={submit}
            />
        ),
    };
};

const styles = StyleSheet.create({
    form: {
        ...Styles.screen,
        flex: 0,
        flexGrow: 1,
    },
    formControl: {
        width: '100%'
    },
    centered: {
        ...Styles.screen,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
});

export default EditProductScreen;
