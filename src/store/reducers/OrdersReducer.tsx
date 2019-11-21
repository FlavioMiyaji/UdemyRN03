import OrdersReducerModel from "../model/OrdersReducerModel";
import { ADD_TO_CART } from "../actions/CartActions";
import { Order } from "../../models";

const initState = new OrdersReducerModel([]);

const OrdersReducer = (state: OrdersReducerModel = initState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const newOrder = new Order(
                new Date().toString(),
                action.payload.items,
                action.payload.totalAmount,
                new Date()
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder),
            };
        }
        default: return state;
    }
};

export default OrdersReducer;