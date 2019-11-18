import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import ProductsReducer from './store/reducers/ProductsReducer';
import { Colors } from './constants';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  productsReducer: ProductsReducer,
});

const store = createStore(rootReducer);

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