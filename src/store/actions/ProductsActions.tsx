import { Product } from '../../models';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (product: Product) => {
    return { type: DELETE_PRODUCT, payload: { id: product.id } };
};

export const createProduct = (product: Product) => {
    return { type: CREATE_PRODUCT, payload: product };
};

export const updateProduct = (product: Product) => {
    return { type: UPDATE_PRODUCT, payload: product };
};
