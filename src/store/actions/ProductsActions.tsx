import { Product } from '../../models';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const baseUrl = 'https://rn-complete-guide-850df.firebaseio.com/';

export const fetchProducts = () => {
    return async (dispatch: Function) => {
        // Any async code with ReduxThunk.
        try {
            // .json is besause os the firebase
            const response = await fetch(`${baseUrl}products.json`);
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
                    ownerId: 'u1',
                });
            }

            dispatch({
                type: SET_PRODUCTS,
                payload: products,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteProduct = (product: Product) => {
    return async (dispatch: Function) => {
        const response = await fetch(`${baseUrl}products/${product.id}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({ type: DELETE_PRODUCT, payload: { id: product.id } });
    };
};

export const createProduct = (product: Product) => {
    return async (dispatch: Function) => {
        // Any async code with ReduxThunk.

        // .json is besause os the firebase
        const response = await fetch(`${baseUrl}products.json`, {
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
                id
            },
        });
    };
};

export const updateProduct = (product: Product) => {
    return async (dispatch: Function) => {
        const response = await fetch(`${baseUrl}products/${product.id}.json`, {
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
