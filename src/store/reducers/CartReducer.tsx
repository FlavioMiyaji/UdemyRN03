import { Product, CartItem, Order } from '../../models';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/CartActions';
import { ADD_ORDER } from '../actions/OrdersActions';
import { DELETE_PRODUCT } from '../actions/ProductsActions';

export interface State {
    items: CartItem[];
    totalAmount: number;
}

export type Action =
    | { type: 'ADD_TO_CART', payload: Product }
    | { type: 'REMOVE_FROM_CART', payload: { id: string } }
    | { type: 'ADD_ORDER', payload: Order }
    | { type: 'DELETE_PRODUCT', payload: Product }
    ;

const initState = {
    items: [],
    totalAmount: 0,
};

const CartReducer = (state: State = { ...initState }, action: Action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const { payload: product } = action;
            const price = product.price;

            const items = [...state.items];
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
            const { payload: { id: productId } } = action;

            const items = [...state.items];
            let index: number | undefined = items.findIndex(({ product: { id } }) => (id === productId));
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
        case ADD_ORDER: {
            return initState;
        }
        case DELETE_PRODUCT: {
            const { payload: { id: productId } } = action;
            const items = [...state.items];
            const foundItem: CartItem | undefined = items.find((cartItem: CartItem) => cartItem.product.id === productId);
            if (!foundItem) {
                return state;
            }
            return {
                ...state,
                items: items.filter((cartItem: CartItem) => cartItem !== foundItem),
                totalAmount: state.totalAmount - foundItem.sum,
            };
        }
        default: return state;
    }
};

export default CartReducer;
