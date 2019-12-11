import { ThunkDispatch } from 'redux-thunk';
import { CartItem, Order } from '../../models';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

const baseUrl = 'https://rn-complete-guide-850df.firebaseio.com/';

export const fetchOrders = () => {
    type Actions = { type: 'SET_ORDERS', payload: Order[] };
    return async (dispatch: ThunkDispatch<{}, undefined, Actions>) => {
        // Any async code with ReduxThunk.
        try {
            // .json is besause os the firebase
            const response = await fetch(`${baseUrl}orders/u1.json`);
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
    type Actions = { type: 'ADD_ORDER', payload: { id: string, items: CartItem[], totalAmount: number, date: Date } };
    return async (dispatch: ThunkDispatch<{}, undefined, Actions>) => {
        // Any async code with ReduxThunk.

        // .json is besause os the firebase
        const response = await fetch(`${baseUrl}orders/u1.json`, {
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
            type: ADD_ORDER, payload: {
                id,
                items,
                totalAmount,
                date,
            }
        });
    };
};
