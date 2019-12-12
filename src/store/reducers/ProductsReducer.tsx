import { Product } from '../../models';
import {
    SET_PRODUCTS,
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
} from '../actions/ProductsActions';

export interface State {
    availableProducts: Product[];
    userProducts: Product[];
}

export type Action =
    | { type: 'SET_PRODUCTS', payload: { ownerId: string, products: Product[] } }
    | { type: 'CREATE_PRODUCT', payload: { ownerId: string, product: Product } }
    | { type: 'UPDATE_PRODUCT', payload: Product }
    | { type: 'DELETE_PRODUCT', payload: Product }
    ;

const initState = {
    availableProducts: [],
    userProducts: [],
};

const ProductsReducer = (state: State = { ...initState }, action: Action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            const { payload: { ownerId, products } } = action;
            return {
                ...state,
                availableProducts: products,
                userProducts: products.filter(({ ownerId: id }: Product) => (id === ownerId)),
            }
        }
        case CREATE_PRODUCT: {
            const { payload: { ownerId, product } } = action;
            const newProduct: Product = new Product(
                product.id,
                ownerId,
                product.title,
                product.imageUrl,
                product.description,
                product.price,
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            };
        }
        case UPDATE_PRODUCT: {
            const { payload: product } = action;
            return {
                ...state,
                availableProducts: updateProducts(state.availableProducts, product),
                userProducts: updateProducts(state.userProducts, product),
            };
        }
        case DELETE_PRODUCT: {
            const { payload: { id: productId } } = action;
            return {
                ...state,
                availableProducts: state.availableProducts.filter(({ id }: Product) => id !== productId),
                userProducts: state.userProducts.filter(({ id }: Product) => id !== productId),
            };
        }
        default: return state;
    }
};

const updateProducts = (list: Product[], product: Product) => {
    const cloneList = [...list];
    const index: number | undefined = cloneList.findIndex(
        ({ id }: Product) => id === product.id
    );
    const updatedProduct = new Product(
        product.id,
        cloneList[index].ownerId,
        product.title,
        product.imageUrl,
        product.description,
        cloneList[index].price,
    );
    cloneList[index] = updatedProduct;
    return cloneList;
}

export default ProductsReducer;
