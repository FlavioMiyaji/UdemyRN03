import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Colors } from './constants';
import ShopNavigator from './navigation/ShopNavigator';
import ProductsReducer, { State as ProductsState } from './store/reducers/ProductsReducer';
import CartReducer, { State as CartState } from './store/reducers/CartReducer';
import OrdersReducer, { State as OrdersState } from './store/reducers/OrdersReducer';
import { Product } from './models';

export interface ReducersState {
  productsReducer: ProductsState;
  cartReducer: CartState;
  ordersReducer: OrdersState;
}

const rootReducer = combineReducers({
  productsReducer: ProductsReducer,
  cartReducer: CartReducer,
  ordersReducer: OrdersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
  },
  body: {
    backgroundColor: Colors.background,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
});

export default App;
