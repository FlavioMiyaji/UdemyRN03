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
import ProductsReducer from './store/reducers/ProductsReducer';
import { Colors } from './constants';
import ShopNavigator from './navigation/ShopNavigator';
import CartReducer from './store/reducers/CartReducer';
import OrdersReducer from './store/reducers/OrdersReducer';
import ReduxThunk from 'redux-thunk';

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
