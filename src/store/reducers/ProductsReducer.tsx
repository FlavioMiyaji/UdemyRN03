import ProductsReducerModel from '../model/ProductsReducerModel';
import DummyProducts from '../../data/dummy-data';
import { Product } from '../../models';
import { DELETE_PRODUCT } from '../actions/ProductsActions';

const initState = new ProductsReducerModel(
    DummyProducts,
    DummyProducts.filter(({ ownerId }: Product) => (ownerId === 'u1'))
);

const ProductsReducer = (state: ProductsReducerModel = { ...initState }, action: any) => {
    switch (action.type) {
        case DELETE_PRODUCT: {
            const productId = action.payload.id;
            return {
                ...state,
                availableProducts: state.availableProducts.filter(({ id }: Product) => id !== productId),
                userProducts: state.userProducts.filter(({ id }: Product) => id !== productId),
            };
        }
        default: return state;
    }
};

export default ProductsReducer;
