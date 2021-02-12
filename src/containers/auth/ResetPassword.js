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
import {emptyEmail,emailReg,invalidEmail,Colors,emptyPassword,emptyCPassword} from '../../constant'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import { logo , backarrow} from '../../assets/'
import * as AppActions from '../../actions'
import {toast} from '../../utilities'

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordError: false,
      confirmPassword:'',
      confirmPasswordError: false,
      loading:false
    }
  }

  submit = () => {
    let {
      password,
      confirmPassword
    } = this.state;

    if (password) {
      if (confirmPassword) {

        if(password === confirmPassword){

        
        let auth = {

        }
          let body = {
            phone:this.props.phone,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
                      
          }
          this.setState({loading:true})
          this.props.resetPassword(auth,body,(data)=>{
            this.setState({loading:false})
            if(data){
              Actions.push('login')
            }
          }).catch((err)=> this.setState({loading:false}))
          
        
       
      }
      else {
        toast({
          text:'Password and Confirm password was not matched',
          type:'danger'
      })
      }
    }
      else {
        this.setState({ confirmPasswordError: true});
      }
    }
    else {
      this.setState({ passwordError: true });
    }
  }

  errorView = type => {
    return (
      <View style={{ paddingTop: 2, marginHorizontal:moderateScale(20)}}>
        <Text style={styles.errorTexts}>
          {type === "password" && this.state.passwordError ? emptyPassword : type === "cPassword" ? emptyCPassword : ''}
        </Text>
      </View>
    );
  };

  render() {
    return (
      
        <View style={{ flex:1,backgroundColor:Colors.White }} >
        
          <Header
          leftIcon={backarrow}
          text="Reset Password"
          leftButtonPress={() => Actions.pop()}
        />
           
            
<KeyboardAwareScrollView
contentContainerStyle={{height:height*0.9}}
showsVerticalScrollIndicator={false}
keyboardShouldPersistTaps="handled"
enableAutomaticScroll={true}

   
>
  
           
          <View style={{flex:0.2}}/>
         <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
         <DesignedTextInput
         label="Password"
         secureTextEntry={true}
         value={this.state.password}
         onChangeText= {(password)=>this.setState({password,passwordError:false}) }
         />
           </View>
           {this.state.passwordError ? this.errorView("password") : null}
           <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
         <DesignedTextInput
         label="Confirm Password"
         secureTextEntry={true}
         value={this.state.confirmPassword}
         onChangeText= {(confirmPassword)=>this.setState({confirmPassword,confirmPasswordError:false}) }
         />
           </View>
           {this.state.confirmPasswordError ? this.errorView("cPassword") : null}
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
 resetPassword:(auth,body,cb) => dispatch(AppActions.resetPassword(auth,body,cb))
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
)(ResetPassword)