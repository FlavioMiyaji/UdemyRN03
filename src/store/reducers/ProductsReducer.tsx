import ProductsReducerModel from '../model/ProductsReducerModel';
import DummyProducts from '../../data/dummy-data';
import { Product } from '../../models';

const initState = new ProductsReducerModel(
    DummyProducts,
    DummyProducts.filter(({ ownerId }: Product) => (ownerId === 'u1'))
);

const ProductsReducer = (state: ProductsReducerModel = initState, action: any) => {
    switch (action.type) {
        default: return state;
    }
};

export default ProductsReducer;
