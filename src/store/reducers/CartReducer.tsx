import CartReducerModel from '../model/CartReducerModel';
import { Product, CartItem } from '../../models';
import { ADD_TO_CARD } from '../actions/CartActions';

const initState = new CartReducerModel(
    [],
    0
);

const CartReducer = (state: CartReducerModel = initState, action: any) => {
    switch (action.type) {
        case ADD_TO_CARD: {
            const product: Product = action.payload;
            const price = product.price;
            const title = product.title;

            const items = [...state.items];
            const index = items.findIndex(({ productId }) => (productId === product.id));
            let item: CartItem;
            if (!index) {
                item = new CartItem(1, product.id, price, title, price);
            } else {
                item = { ...items[index] };
                item.quantity += 1;
                item.sum += price;
                items.splice(index, 1);
            }
            return {
                ...state,
                items: [...items, item],
                totalAmount: state.totalAmount + price,
            };
        }
        default: return state;
    }
};

export default CartReducer;
