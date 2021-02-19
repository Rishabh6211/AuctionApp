import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './index';
import thunkMiddleware from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {logger} from 'redux-logger';
const enhancers = [];
const middlewares = [];
middlewares.push(thunkMiddleware);

export default function configureStore() {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loginReducer', 'productReducer'],
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
  const composedEnhancers = compose(
    applyMiddleware(...middlewares, logger),
    ...enhancers,
  );

  const store = createStore(persistedReducer, composedEnhancers);
  let persistor = persistStore(store);
  // console.log('store----', store.getState());
  // if (store.getState().loginReducer.data) {
  //   Actions.home();
  // }
  return {store, persistor};
}
