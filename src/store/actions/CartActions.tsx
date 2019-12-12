import { Product } from '../../models';
import { Action } from '../reducers/CartReducer';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCard = (product: Product): Action => {
    return ({ type: ADD_TO_CART, payload: product });
};

export const removeFromCard = (id: string): Action => {
    return ({ type: REMOVE_FROM_CART, payload: { id } });
};