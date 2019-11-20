import React from 'react';
import { Alert } from 'react-native';
import CartReducerModel from '../model/CartReducerModel';
import { Product, CartItem } from '../../models';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/CartActions';

const initState = new CartReducerModel([], 0);

const CartReducer = (state: CartReducerModel = initState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const product: Product = action.payload;
            const price = product.price;
            const title = product.title;

            const items = state.items;
            let item: CartItem | undefined = items.find(({ productId }) => (productId === product.id));
            if (!item) {
                item = new CartItem(0, product.id, price, title, 0);
                items.push(item);
            }
            item.quantity += 1;
            item.sum += price;

            return {
                ...state,
                items: [...items],
                totalAmount: state.totalAmount + price,
            };
        }
        case REMOVE_FROM_CART: {
            const id: string = action.payload;

            const items = state.items;
            let index: number | undefined = items.findIndex(({ productId }) => (productId === id));
            let sum = 0;
            if (index >= 0) {
                sum += items[index].sum;
                items.splice(index, 1);
            }

            return {
                ...state,
                items: [...items],
                totalAmount: state.totalAmount - sum,
            };
        }
        default: return state;
    }
};

export default CartReducer;
