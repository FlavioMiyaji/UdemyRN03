import { CartItem } from "../../models";

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems: CartItem[], totalAmount: number) => {
    return { type: ADD_ORDER, payload: {
        cartItems,
        totalAmount,
    } }
};
