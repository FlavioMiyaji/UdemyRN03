import React from 'react';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';
import ProductsReducer, { State as ProductsState } from './store/reducers/ProductsReducer';
import CartReducer, { State as CartState } from './store/reducers/CartReducer';
import OrdersReducer, { State as OrdersState } from './store/reducers/OrdersReducer';
import AuthReducer, { State as AuthState } from './store/reducers/AuthReducer';

export interface ReducersState {
  productsState: ProductsState;
  cartState: CartState;
  ordersState: OrdersState;
  authState: AuthState;
}

const rootReducer = combineReducers({
  productsState: ProductsReducer,
  cartState: CartReducer,
  ordersState: OrdersReducer,
  authState: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
