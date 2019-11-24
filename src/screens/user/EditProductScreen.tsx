import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Styles } from '../../constants';
import { Product } from '../../models';
import { HeaderButton, Input } from '../../components';
import { updateProduct, createProduct } from '../../store/actions/ProductsActions';

const FORM_UPDATE = 'FORM_UPDATE';

interface InputValues {
    title: string,
    imageUrl: string,
    price: string,
    description: string,
}

interface InputValids {
    title: boolean,
    imageUrl: boolean,
    price: boolean,
    description: boolean,
}

interface State {
    inputValues: InputValues,
    inputValids: InputValids,
    formValid: boolean,
}

type Action =
    | { type: 'FORM_UPDATE', payload: { id: string, value: string, valid: boolean } }
    ;

const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case FORM_UPDATE: {
            const { payload: { id: input, value, valid } } = action;
            const inputValues: InputValues = { ...state.inputValues, [input]: value };
            const inputValids: InputValids = { ...state.inputValids, [input]: valid };
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

const EditProductScreen = (props: any) => {
    const { navigation } = props;
    const productId = navigation.getParam('productId');
    let selectedProduct: Product | undefined = undefined;
    if (productId) {
        selectedProduct = useSelector((state: any) =>
            state.productsReducer.availableProducts.find(({ id }: Product) => id === productId)
        );
    }

    const [formState, dispatchFormState] = useReducer(formReducer, {
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
    });

    const dispatch = useDispatch();
    const submitHandler = useCallback(() => {
        if (!formState.formValid) {
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
        if (selectedProduct) {
            dispatch(
                updateProduct({
                    ...selectedProduct,
                    title,
                    imageUrl,
                    description,
                })
            );
        } else {
            dispatch(
                createProduct({
                    id: '',
                    ownerId: 'u1',
                    title,
                    imageUrl,
                    price: +price,
                    description,
                })
            );
        }
        navigation.goBack();
    }, [
        dispatch,
        selectedProduct,
        formState,
    ]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback(({ input, value, valid }: any) => {
        dispatchFormState({
            type: FORM_UPDATE,
            payload: { input, value, valid }
        });
    }, [dispatchFormState]);

    return (
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
    );
};

EditProductScreen.navigationOptions = ({ navigation }: any) => {
    const productId = navigation.getParam('productId');
    const submit: Function = navigation.getParam('submit');
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
});

export default EditProductScreen;
