import { Product } from '../../models';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = (product: Product) => {
    return { type: DELETE_PRODUCT, payload: { id: product.id } };
};
