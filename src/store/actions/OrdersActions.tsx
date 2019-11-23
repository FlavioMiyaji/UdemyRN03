import { CartItem } from '../../models';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (items: CartItem[], totalAmount: number) => {
    return { type: ADD_ORDER, payload: {
        items,
        totalAmount,
    } }
};
