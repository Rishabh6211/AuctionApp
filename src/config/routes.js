import React, { Component } from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import {
    SafeAreaView,
    StatusBar,
    Dimensions
  } from 'react-native';
import {SignupContainer,LoginContainer,ForgotContainer,EnterOtp,ForgotOtp,ResetPassword,Home,ProductDetail,Profile,Products} from '../containers/'
import {Sidebar} from '../components'
import {sidebar} from '../assets/'
const { height, width } = Dimensions.get("window");
import { Root } from "native-base";
import productListing from '../containers/product/productListing';
const RouterComponent = () => {
  return (
    <Root>
    <Router>
      <Scene key="root">
        <Scene key="login"
          component={LoginContainer}
          title="login"
          hideNavBar
          initial
        />
        <Scene key="signup"
          component={SignupContainer}
          title="signup"
          hideNavBar
        />
      <Scene key="forgot"
          component={ForgotContainer}
          title="forgot"
          hideNavBar
        />
         <Scene key="otp"
          component={EnterOtp}
          title="otp"
          hideNavBar
        />
         <Scene key="forgotOtp"
          component={ForgotOtp}
          title="forgotOtp"
          hideNavBar
        />
         <Scene key="resetPassword"
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
       >
         
          <Scene key="home"
           drawer={true}
           drawerImage={sidebar}
          component={Home}
          title="home"
          hideNavBar          
        />

        <Scene key="product"
           drawer={true}
           drawerImage={sidebar}
          component={Products}
          title="products"
          hideNavBar          
        />
       
        </Drawer>
        <Scene key="listing"
          component={productListing}
          title="listing"
          hideNavBar          
        />
         <Scene key="productDetail"
          component={ProductDetail}
          title="productDetail"
          hideNavBar          
        />
         <Scene key="profile"
          component={Profile}
          title="profile"
          hideNavBar          
        />
      </Scene>
    </Router>
    </Root>
   
  );
}

export default RouterComponent;