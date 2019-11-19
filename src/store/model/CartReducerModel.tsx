import { CartItem } from '../../models';

class CartReducerModel {
    items: CartItem[];
    totalAmount: number;

    constructor(items: CartItem[], totalAmount: number) {
        this.items = items;
        this.totalAmount = totalAmount;
    }
}

export default CartReducerModel;
