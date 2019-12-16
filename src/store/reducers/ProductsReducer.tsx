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
    | { type: 'CREATE_PRODUCT', payload: Product }
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
            const { payload: product } = action;
            const newProduct: Product = new Product(
                product.id,
                product.ownerId,
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
            const availableProducts = updateProducts(state.availableProducts, product);
            const userProducts = updateProducts(state.userProducts, product);
            return {
                ...state,
                availableProducts,
                userProducts,
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
    const products = [...list];
    const index: number | undefined = products.findIndex(
        ({ id }: Product) => id === product.id
    );
    const updatedProduct = new Product(
        product.id,
        products[index].ownerId,
        product.title,
        product.imageUrl,
        product.description,
        products[index].price,
    );
    products[index] = updatedProduct;
    return products;
}

export default ProductsReducer;
