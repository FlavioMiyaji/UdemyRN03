import { ThunkDispatch } from 'redux-thunk';
import { CartItem, Order } from '../../models';
import { ReducersState as S } from '../../App';
import { Action } from '../reducers/OrdersReducer';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

const baseUrl = 'https://rn-complete-guide-850df.firebaseio.com/';

export const fetchOrders = () => {
    return async (dispatch: ThunkDispatch<S, undefined, Action>, getState: () => S) => {
        // Any async code with ReduxThunk.
        const { authState: { userId } } = getState();
        try {
            // .json is besause os the firebase
            const response = await fetch(`${baseUrl}orders/${userId}.json`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const orders: Order[] = [];
            for (const key in data) {
                const order = data[key];
                orders.push(new Order(
                    key,
                    order.items,
                    order.totalAmount,
                    new Date(order.date),
                ));
            }

            dispatch({
                type: SET_ORDERS,
                payload: orders,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const addOrder = (items: CartItem[], totalAmount: number) => {
    if (!totalAmount) {
        return;
    }
    const date = new Date();
    return async (dispatch: ThunkDispatch<S, undefined, Action>, getState: () => S) => {
        // Any async code with ReduxThunk.
        const { authState: { token, userId } } = getState();
        // .json is besause os the firebase
        const response = await fetch(`${baseUrl}orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items,
                totalAmount,
                date: date.toISOString(),
            }),
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const { name: id } = await response.json();
        dispatch({
            type: ADD_ORDER,
            payload: new Order(
                id,
                items,
                totalAmount,
                date
            ),
        });
    };
};
