import { Order } from '../../models';

class OrdersReducerModel {
    orders: Order[];
    constructor(orders: Order[]) {
        this.orders = orders;
    }
}

export default OrdersReducerModel;