import OrdersReducerModel from '../model/OrdersReducerModel';
import { Order } from '../../models';
import { ADD_ORDER } from '../actions/OrdersActions';

const initState = new OrdersReducerModel([]);

const OrdersReducer = (state: OrdersReducerModel = { ...initState }, action: any) => {
    switch (action.type) {
        case ADD_ORDER: {
            if (!action.payload.totalAmount) {
                return state;
            }
            const newOrder = new Order(
                Date.now(),
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