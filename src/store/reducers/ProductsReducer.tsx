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

type Action =
    | { type: 'SET_PRODUCTS', payload: Product[] }
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
            const products: Product[] = action.payload;
            return {
                ...state,
                availableProducts: products,
                userProducts: products.filter(({ ownerId }: Product) => (ownerId === 'u1')),
            }
        }
        case CREATE_PRODUCT: {
            const payload: Product = action.payload;
            const newProduct: Product = new Product(
                payload.id,
                'u1',
                payload.title,
                payload.imageUrl,
                payload.description,
                payload.price,
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            };
        }
        case UPDATE_PRODUCT: {
            const payload: Product = action.payload;
            return {
                ...state,
                availableProducts: updateProducts(state.availableProducts, payload),
                userProducts: updateProducts(state.userProducts, payload),
            };
        }
        case DELETE_PRODUCT: {
            const productId: string = action.payload.id;
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
