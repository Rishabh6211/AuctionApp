import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { CommonEnterOtp, Loader } from '../../components'
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {emptyEmail,emailReg,invalidEmail} from '../../constant'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import {toast} from '../../utilities'
import * as AppActions from '../../actions'

class ForgotOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpValue:'',
      loading:false
    }
  }

  submit = () => {
    let {
      otpValue,
    } = this.state;

    if (otpValue) {
      let auth = {};
      let body = {
        phone:this.props.phone,
        code:this.state.otpValue

      }
      this.setState({loading:true})
      this.props.forgotOtp(auth,body,(data)=>{
        this.setState({loading:false})
        if(data){
          Actions.resetPassword({phone:this.props.phone})
        }
      }).catch((err)=> this.setState({loading:false}))
    }
      
    
    else {
      toast({
        text:'Please enter the otp',
        type:'danger'
    })
    }
  }

  errorView = type => {
    return (
      <View style={{ paddingTop: 2, }}>
        <Text style={styles.errorTexts}>
          {type === "email" && this.state.invalidEmailAddress ? invalidEmail : type === "email" ? emptyEmail : ''}
        </Text>
      </View>
    );
  };

  render() {
    console.log('propsForgot--',this.props)
    return (
     <View style={{flex:1}}>
       <CommonEnterOtp mobileNumber={this.props.phone} title="Ente the otp sent via sms on the phone number" onChangeTextPress={(text)=> this.setState({otpValue:text})}
       submit={()=>this.submit()}
       resendOtp={()=> alert('resend')}
       value={this.state.otpValue}
       otpValue={this.state.otpValue}
       />
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
  forgotOtp:(auth,body,cb) => dispatch(AppActions.verificationOtp(auth,body,cb))
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
)(ForgotOtp)