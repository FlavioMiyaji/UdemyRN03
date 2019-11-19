import { Product } from '../../models';

class ProductsReducerModel {
    availableProducts: Product[];
    userProducts: Product[];

    constructor(availableProducts: Product[], userProducts: Product[]) {
        this.availableProducts = availableProducts;
        this.userProducts = userProducts;
    }
}

export default ProductsReducerModel;
