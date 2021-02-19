import {Root} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {Drawer, Router, Scene} from 'react-native-router-flux';
import {sidebar} from '../assets/';
import {Sidebar} from '../components';
import {
  EnterOtp,
  ForgotContainer,
  ForgotOtp,
  Home,
  LoginContainer,
  ProductDetail,
  Products,
  Profile,
  ResetPassword,
  SignupContainer,
} from '../containers/';
import productListing from '../containers/product/productListing';
import configureStore from '../store/setup';
const {persistor, store} = configureStore();
const {height, width} = Dimensions.get('window');
const RouterComponent = () => {
  const isLoggedIn = store.getState().loginReducer.isLoggedIn;
  return (
    <Root>
      <Router>
        <Scene key="root">
          <Scene
            key="login"
            component={LoginContainer}
            title="login"
            hideNavBar
            initial={!isLoggedIn}
          />
          <Scene
            key="signup"
            component={SignupContainer}
            title="signup"
            hideNavBar
          />
          <Scene
            key="forgot"
            component={ForgotContainer}
            title="forgot"
            hideNavBar
          />
          <Scene key="otp" component={EnterOtp} title="otp" hideNavBar />
          <Scene
            key="forgotOtp"
            component={ForgotOtp}
            title="forgotOtp"
            hideNavBar
          />
          <Scene
            key="resetPassword"
            component={ResetPassword}
            title="resetPassword"
            hideNavBar
          />
          <Drawer
            hideNavBar
            key="drawer"
            contentComponent={Sidebar}
            drawerImage={sidebar}
            drawerWidth={width * 0.8}
            drawerPosition="right"
            initial={isLoggedIn}>
            <Scene
              key="home"
              drawer={true}
              drawerImage={sidebar}
              component={Home}
              title="home"
              hideNavBar
            />

            <Scene
              key="product"
              drawer={true}
              drawerImage={sidebar}
              component={Products}
              title="products"
              hideNavBar
            />
          </Drawer>
          <Scene
            key="listing"
            component={productListing}
            title="listing"
            hideNavBar
          />
          <Scene
            key="productDetail"
            component={ProductDetail}
            title="productDetail"
            hideNavBar
          />
          <Scene key="profile" component={Profile} title="profile" hideNavBar />
        </Scene>
      </Router>
    </Root>
  );
};

export default RouterComponent;
