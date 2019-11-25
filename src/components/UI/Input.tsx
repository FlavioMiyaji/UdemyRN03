import React, { useReducer, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from 'react-native';
import {
    Fonts,
    Colors,
} from '../../constants';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

interface State {
    value: string;
    valid: boolean;
    touched: boolean;
}

type Action =
    | { type: 'INPUT_CHANGE', payload: { text: string, valid: boolean } }
    | { type: 'INPUT_BLUR' }
    ;

const inputReducer = (state: State, action: Action) => {
    switch (action.type) {
        case INPUT_CHANGE: {
            const { payload: { text: value, valid } } = action;
            return {
                ...state,
                value,
                valid,
            };
        }
        case INPUT_BLUR: {
            return {
                ...state,
                touched: true,
            };
        }
        default: return state;
    }
};

interface InputProps extends TextInputProps {
    id: string,
    label: string;
    errorText: string;
    onInputChange?: Function;
    initValue?: string;
    initValid?: boolean;
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
}

const Input = (props: InputProps) => {
    const { id, onInputChange } = props;
    const [inputState, inputDispatch] = useReducer(inputReducer, {
        value: props.initValue ? props.initValue : '',
        valid: props.initValid ? true : false,
        touched: false,
    });

    const textChangeHandler = (text: string) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = true;
        if (props.required && text.trim().length === 0) {
            valid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            valid = false;
        }
        if (props.min != null && +text < props.min) {
            valid = false;
        }
        if (props.max != null && +text > props.max) {
            valid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            valid = false;
        }
        inputDispatch({
            type: INPUT_CHANGE,
            payload: {
                text,
                valid,
            },
        });
    };

    const lostFocusHandler = () => {
        inputDispatch({ type: INPUT_BLUR });
    };

    if (onInputChange) {
        useEffect(() => {
            if (!inputState.touched) {
                return;
            }
            const { value, valid } = inputState;
            onInputChange({ id, value, valid });
        }, [inputState, onInputChange]);
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>
                {props.label}{props.required && (
                    <Text style={styles.labelRequired}>{' *'}</Text>
                )}
            </Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {!inputState.valid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: Colors.onBackground,
        marginVertical: 8,
    },
    labelRequired: {
        color: Colors.error,
    },
    errorContainer: {
        marginVertical: 5,
    },
    error: {
        fontFamily: Fonts.regular,
        fontSize: 13,
        color: Colors.error,
    },
    input: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: Colors.onBackground,
        borderBottomColor: Colors.onBackground,
        borderBottomWidth: 1,
        paddingHorizontal: 2,
        paddingVertical: 5,
    },
});

export default Input;
