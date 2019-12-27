import { ThunkDispatch } from 'redux-thunk';
import { AsyncStorage, Alert } from 'react-native';
import { ReducersState as S } from '../../App';
import { Action, State } from '../reducers/AuthReducer';
import { authUrl as baseUrl, webAPIKey } from '../../the-shop.json';

let timer: number;

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const userData = 'userData';

export const authenticate = (userData: State, expirationTime: number): any => {
    return (dispatch: ThunkDispatch<S, undefined, Action>) => {
        dispatch(setLogoutTimer(expirationTime));
        dispatch({
            type: AUTHENTICATE,
            payload: userData,
        });
    };
};

export const logout = (): Action => {
    if (timer) {
        clearTimeout(timer);
    }
    AsyncStorage.removeItem(userData);
    return { type: LOGOUT };
};

const setLogoutTimer = (expirationTime: number): any => {
    return (dispatch: ThunkDispatch<S, undefined, Action>) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const singup = (email: string, password: string): any => {
    return async (dispatch: ThunkDispatch<S, undefined, Action>) => {
        const response = await fetch(`${baseUrl}:signUp?key=${webAPIKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });
        if (!response.ok) {
            throw new Error('Something went worng!');
        }
        const { idToken, localId, expiresIn } = await response.json();
        const expirationTime = parseInt(expiresIn) * 1000;
        Alert.alert('expirationTime', `${expirationTime}`);
        const expiryDate = new Date(new Date().getTime() + expirationTime).toISOString();
        const userData = {
            token: idToken,
            userId: localId,
            expiryDate,
        };
        dispatch(authenticate(userData, expirationTime));
        saveDataToStorage(userData);
    };
};

export const login = (email: string, password: string): any => {
    return async (dispatch: ThunkDispatch<S, undefined, Action>) => {
        const response = await fetch(`${baseUrl}:signInWithPassword?key=${webAPIKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });
        if (!response.ok) {
            const { error: { message: errorId } } = await response.json();
            let message = `Something went worng! ${errorId}`;
            if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
                message = 'The email or password is invalid!';
            }
            throw new Error(message);
        }
        const { idToken, localId, expiresIn } = await response.json();
        const expirationTime = parseInt(expiresIn) * 1000;
        Alert.alert('expirationTime', `${expirationTime}`);
        const expiryDate = new Date(new Date().getTime() + expirationTime).toISOString();
        const userData = {
            token: idToken,
            userId: localId,
            expiryDate,
        };
        dispatch(authenticate(userData, expirationTime));
        saveDataToStorage(userData);
    };
};

export interface UserData {
    token: string;
    userId: string;
    expiryDate: string,
}

const saveDataToStorage = ({ token, userId, expiryDate }: UserData): void => {
    AsyncStorage.setItem(
        userData,
        JSON.stringify({
            token,
            userId,
            expiryDate,
        })
    );
};
