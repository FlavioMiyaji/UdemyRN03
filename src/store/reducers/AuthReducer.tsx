import { SINGUP, LOGIN } from '../actions/AuthActions';

export interface State {
    token: string;
    userId: string;
}

export type Action =
    | { type: 'SINGUP', payload: State }
    | { type: 'LOGIN', payload: State }
    ;

const initState = {
    token: '',
    userId: '',
};

const AuthReducer = (state: State = { ...initState }, action: Action) => {
    switch (action.type) {
        case SINGUP:
        case LOGIN: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default: return state;
    }
};

export default AuthReducer;
