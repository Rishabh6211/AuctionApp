import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { DesignedButton, DesignedTextInput,Header, Loader } from '../../components/'
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {emptyEmail,emailReg,invalidEmail,Colors,phoneReg,invalidPhone,emptyMobile, emptyPassword} from '../../constant'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import { logo , backarrow} from '../../assets/'
import * as AppActions from '../../actions'

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
     phoneError: false,
     invalidPhone:false,
     loading:false
    }
  }

  submit = () => {
    let {
      phone,
    } = this.state;

    if (phone) {
      if (phoneReg.test(phone)) {
        this.setState({ invalidPhone: false })
        let auth = {}
          let body = {
            phone: phone,
                     
          }
          this.setState({loading:true})
       this.props.forgotPassword(auth,body,(data)=>{
        this.setState({loading:false})
         if(data){
           Actions.forgotOtp({phone:phone})
         }
       }).catch((err)=> this.setState({loading:false}))
      }
      else {
        this.setState({ phoneError: true, invalidPhone: true });
      }
    }
    else {
      this.setState({ phoneError: true });
    }
  }

  errorView = type => {
    return (
      <View style={{ paddingTop: 2,marginHorizontal:moderateScale(20) }}>
        <Text style={styles.errorTexts}>
          {type === "phone" && this.state.invalidPhone ? invalidPhone : type === "phone" ? emptyMobile : ''}
        </Text>
      </View>
    );
  };

  render() {
    return (
      
        <View style={{ flex:1,backgroundColor:Colors.White }} >
        
          <Header
          leftIcon={backarrow}
          text="Forgot Password"
          leftButtonPress={() => Actions.pop()}
        />
           
            
<KeyboardAwareScrollView
contentContainerStyle={{height:height*0.9}}
showsVerticalScrollIndicator={false}
keyboardShouldPersistTaps="handled"
enableAutomaticScroll={true}

   
>
  
           
          <View style={{flex:0.3}}/>
         <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
         <DesignedTextInput
         label="Phone Number"
         keyboardType={'numeric'}
         value={this.state.phone}
         onChangeText= {(phone)=>this.setState({phone,phoneError:false}) }
         />
         
           </View>
           {this.state.phoneError ? this.errorView("phone") : null}
           <View style={{flex:0.1}}/>
           <View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}>
             <DesignedButton 
             buttonText="Submit"
             onPress={()=>this.submit()}
             />
             </View>
               
              </KeyboardAwareScrollView>
              <Loader loading={this.state.loading}/>
          </View>
     
     
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};
const mapDispatchToProps = dispatch => ({
  forgotPassword:(auth,body,cb) => dispatch(AppActions.forgotPassword(auth,body,cb))

});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  },
  bottomTextContainer: {
    height: height * 0.15
  },
  buttonView: {
    height: height * 0.10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    // flexDirection: "row"
  },
  fieldView: {
    height: height * 0.30,
    marginHorizontal: moderateScale(20)
  },
  field: {
    height: height * 0.12
  },
  errorTexts: {
    color: "#cc0000",
    fontSize: moderateScale(13)
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword)