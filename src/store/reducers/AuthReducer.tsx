import { AUTHENTICATE, LOGOUT } from '../actions/AuthActions';

export interface State {
    token: string;
    userId: string;
}

export type Action =
    | { type: 'AUTHENTICATE', payload: State }
    | { type: 'LOGOUT' }
    ;

const initState = {
    token: '',
    userId: '',
};

const AuthReducer = (state: State = { ...initState }, action: Action) => {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case LOGOUT: {
            return {
                ...initState
            };
        }
        default: return state;
    }
};

export default AuthReducer;
