import ProductsReducerModel from '../model/ProductsReducerModel';
import DummyProducts from '../../data/dummy-data';
import { Product } from '../../models';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/ProductsActions';

const initState = new ProductsReducerModel(
    DummyProducts,
    DummyProducts.filter(({ ownerId }: Product) => (ownerId === 'u1'))
);

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

const ProductsReducer = (state: ProductsReducerModel = { ...initState }, action: any) => {
    switch (action.type) {
        case CREATE_PRODUCT: {
            const payload: Product = action.payload;
            const newProduct: Product = new Product(
                String(Date.now()),
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

export default ProductsReducer;
