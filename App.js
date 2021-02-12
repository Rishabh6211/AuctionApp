/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import configureStore from './src/store/setup'
import RouterComponent from './src/config/routes'
import { PersistGate } from 'redux-persist/integration/react';

const { persistor, store } = configureStore();

export default class App extends Component {

  constructor(props){
    super(props)
    global.screen ="Auction"
  
  }

  render(){
    return (
      <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>

        <StatusBar barStyle="dark-content" />
       
        <RouterComponent/> 
        
      </PersistGate>
      </Provider>
     
    );
  }
 

};



