import { ThunkDispatch } from 'redux-thunk';
import { ReducersState as S } from '../../App';
import { Action } from '../reducers/AuthReducer';

export const SINGUP = 'SINGUP';
export const LOGIN = 'LOGIN';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
const webAPIKey = 'AIzaSyBx7C-QoM3bDcFgGfbKQ76xULzpCGA_1g0';

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

        const { idToken, localId } = await response.json();
        dispatch({
            type: SINGUP,
            payload: {
                token: idToken,
                userId: localId,
            },
        });
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
        const { idToken, localId } = await response.json();
        dispatch({
            type: LOGIN,
            payload: {
                token: idToken,
                userId: localId,
            },
        });
    };
};