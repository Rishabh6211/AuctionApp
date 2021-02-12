import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './index';
import thunkMiddleware from 'redux-thunk';


import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';


const enhancers = [];
const middlewares = []
middlewares.push(thunkMiddleware);


export default function configureStore() {

  // let mobileNumner = "9876543210";
  // let mobileNumner = "9999098199";  
  // AsyncStorage.setItem('mobileNumber', mobileNumner);



  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loginReducer','productReducer']
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

  const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  );
  // const store = createStore(reducers,compose(applyMiddleware(...middlewares)) );


  // console.log("store-----", store)
  // if (store.getState().loginReducer.loginx) {

  //   console.log("inif")
  //   CommonActions.navigate({
  //     name: 'Home'
  //   })

  // } else {
  //   console.log("inelse")
  //   CommonActions.navigate({
  //     name: 'Signin'
  //   })

  // }

  const store = createStore(persistedReducer, composedEnhancers);
  let persistor = persistStore(store)
console.log('store----',store.getState().loginReducer.data)
  
   

  return { store, persistor };

}
