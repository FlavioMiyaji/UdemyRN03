import CartReducerModel from '../model/CartReducerModel';
import { Product, CartItem } from '../../models';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/CartActions';

const initState = new CartReducerModel([], 0);

const CartReducer = (state: CartReducerModel = initState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const product: Product = action.payload;
            const price = product.price;

            const items = state.items;
            let item: CartItem | undefined = items.find(({ product: { id } }) => (id === product.id));
            if (!item) {
                item = new CartItem(0, product, 0);
                items.push(item);
            }
            item.quantity += 1;
            item.sum += price;

            return {
                ...state,
                items: [...items],
                totalAmount: state.totalAmount + price,
            };
        }
        case REMOVE_FROM_CART: {
            const id: string = action.payload;

            const items = state.items;
            let index: number | undefined = items.findIndex(({ product: { id } }) => (id === id));
            let price = 0;
            if (index >= 0) {
                const item = items[index];
                price = item.product.price;
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.sum -= item.product.price;
                } else {
                    items.splice(index, 1);
                }
            }

            const totalAmount = state.totalAmount - price;
            return {
                ...state,
                items: [...items],
                totalAmount: totalAmount > 0.0 ? totalAmount : 0.0,
            };
        }
        default: return state;
    }
};

export default CartReducer;
