import Product from "./Product";

class CartItem {
    quantity: number;
    product: Product;
    sum: number;

    constructor(
        quantity: number,
        product: Product,
        sum: number
    ) {
        this.quantity = quantity;
        this.product = product;
        this.sum = sum;
    }
}

export default CartItem;
