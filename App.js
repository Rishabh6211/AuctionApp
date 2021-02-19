/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RouterComponent from './src/config/routes';
import configureStore from './src/store/setup';
const {persistor, store} = configureStore();
const onBeforeLift = () => {
  // take some action before the gate lifts
};
export default class App extends Component {
  constructor(props) {
    super(props);
    global.screen = 'Auction';
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={onBeforeLift}>
          <StatusBar barStyle="dark-content" />
          <RouterComponent />
        </PersistGate>
      </Provider>
    );
  }
}
