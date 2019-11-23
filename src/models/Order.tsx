import moment from 'moment';
import CartItem from './CartItem';

class Order {
    id: number;
    items: CartItem[];
    totalAmount: number;
    date: Date;

    constructor(id: number,
        items: CartItem[],
        totalAmount: number,
        date: Date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Order;