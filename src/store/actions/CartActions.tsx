import { Product } from '../../models';

export const ADD_TO_CARD = 'ADD_TO_CARD';

export const addToCard = (product: Product) => {
    return { type: ADD_TO_CARD, payload: product };
};
