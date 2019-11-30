import { Order } from '../../models';
import { ADD_ORDER, SET_ORDERS } from '../actions/OrdersActions';

export interface State {
    orders: Order[];
}

type Action =
    | { type: 'ADD_ORDER', payload: Order }
    | { type: 'SET_ORDERS', payload: Order[] }
    ;

const initState = {
    orders: [],
};

const OrdersReducer = (state: State = { ...initState }, action: Action) => {
    switch (action.type) {
        case SET_ORDERS: {
            const { payload } = action;
            return {
                ...state,
                orders: payload,
            };
        }
        case ADD_ORDER: {
            const { payload } = action;
            return {
                ...state,
                orders: state.orders.concat(payload),
            };
        }
        default: return state;
    }
};

export default OrdersReducer;