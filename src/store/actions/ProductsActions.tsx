import { ThunkDispatch } from 'redux-thunk';
import { Product } from '../../models';
import { ReducersState as S } from '../../App';
import { Action } from '../reducers/ProductsReducer';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const baseUrl = 'https://rn-complete-guide-850df.firebaseio.com/';
const baseMap = 'products';
const firebaseJson = '.json'; // .json is besause os the firebase

export const fetchProducts = () => {
    return async (dispatch: ThunkDispatch<S, undefined, Action>, getState: () => S) => {
        const { authState: { userId } } = getState();
        try {
            const response = await fetch(`${baseUrl}${baseMap}${firebaseJson}`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            const products: Product[] = [];
            for (const key in data) {
                const product = data[key];
                products.push({
                    ...product,
                    id: key,
                    ownerId: userId,
                });
            }
            dispatch({
                type: SET_PRODUCTS,
                payload: {
                    ownerId: userId,
                    products,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteProduct = (product: Product) => {
    return async (dispatch: ThunkDispatch<S, undefined, Action>, getState: () => S) => {
        const { authState: { token } } = getState();
        const response = await fetch(`${baseUrl}${baseMap}/${product.id}${firebaseJson}?auth=${token}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({ type: DELETE_PRODUCT, payload: { ...product } });
    };
};

export const createProduct = (product: Product) => {
    return async (dispatch: ThunkDispatch<S, undefined, Action>, getState: () => S) => {
        const { authState: { token, userId } } = getState();
        const response = await fetch(`${baseUrl}${baseMap}${firebaseJson}?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: product.title,
                imageUrl: product.imageUrl,
                price: product.price,
                description: product.description,
            }),
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const { name: id } = await response.json();
        dispatch({
            type: CREATE_PRODUCT,
            payload: {
                ...product,
                id,
                ownerId: userId,
            },
        });
    };
};

export const updateProduct = (product: Product) => {
    return async (dispatch: ThunkDispatch<S, undefined, Action>, getState: () => S) => {
        const { authState: { token } } = getState();
        const response = await fetch(`${baseUrl}${baseMap}/${product.id}${firebaseJson}?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: product.title,
                imageUrl: product.imageUrl,
                description: product.description,
            }),
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({ type: UPDATE_PRODUCT, payload: product });
    };
};
