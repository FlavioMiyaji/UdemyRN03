import { ThunkDispatch } from 'redux-thunk';
import { ReducersState as S } from '../../App';
import { Action, State } from '../reducers/AuthReducer';
import { AsyncStorage } from 'react-native';

let timer: number;

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const userData = 'userData';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
const webAPIKey = 'AIzaSyBx7C-QoM3bDcFgGfbKQ76xULzpCGA_1g0';

export const authenticate = (userData: State): Action => {
    return {
        type: AUTHENTICATE,
        payload: userData,
    };
};

export const logout = (): Action => {
    clearLogoutTimer();
    AsyncStorage.removeItem(userData);
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (!timer) {
        return;
    }
    setLogoutTimer(timer);
};

const setLogoutTimer = (expirationTime: number) => {
    return (dispatch: ThunkDispatch<S, undefined, Action>) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const singup = (email: string, password: string) => {
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
        const expiryDate = new Date(new Date().getTime() + (parseInt(expiresIn) * 1000)).toISOString();
        const userData = {
            token: idToken,
            userId: localId,
            expiryDate,
        };
        dispatch(authenticate(userData));
        saveDataToStorage(userData);
    };
};

export const login = (email: string, password: string) => {
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
        const expiryDate = new Date(new Date().getTime() + (parseInt(expiresIn) * 1000)).toISOString();
        const userData = {
            token: idToken,
            userId: localId,
            expiryDate,
        };
        dispatch(authenticate(userData));
        saveDataToStorage(userData);
    };
};

export interface UserData {
    token: string;
    userId: string;
    expiryDate: string,
}

const saveDataToStorage = ({ token, userId, expiryDate }: UserData) => {
    AsyncStorage.setItem(
        userData,
        JSON.stringify({
            token,
            userId,
            expiryDate,
        })
    );
};
