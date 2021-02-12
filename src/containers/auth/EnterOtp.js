import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { CommonEnterOtp } from '../../components/'
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {emptyEmail,emailReg,invalidEmail,invalidOtp} from '../../constant'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import * as AppActions from '../../actions'
import {toast} from '../../utilities'

class EnterOtp extends Component {
  constructor(props) {
    console.log('props---',props)
    super(props);
    this.state = {
      otpValue:'',
      otpError:false
    }
  }

 

  submit = () => {
    let {
      otpValue,
    } = this.state;

    if (otpValue) {
      
      
        let auth = {}
        
          let body = {
            phone: this.props.phone,
            code:this.state.otpValue           
          }

         console.log('body----',body)
        this.props.otp(auth,body,(data)=>{
          if(data){
            Actions.push('login')
          }
        })
       
      
     
    }
    else {
      toast({
        text:invalidOtp,
        type:'danger'
    })
      this.setState({ otpError: true });
    }
  }

  errorView = type => {
    return (
      <View style={{paddingTop: 1,marginHorizontal:20}}>
        <Text style={styles.errorTexts}>
          {type === "otp"  ? invalidOtp : ''}
        </Text>
      </View>
    );
  };

  render() {
    return (
     <View style={{flex:1}}>
       <CommonEnterOtp mobileNumber={this.props.phone} title="Ente the otp sent via sms on the phone number" onChangeTextPress={(text)=> this.setState({otpValue:text,otpError:false})}
       submit={()=>this.submit()}
       resendOtp={()=> alert('resend')}
       value={this.state.otpValue}
       otpValue={this.state.otpValue}
       />
       
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};
const mapDispatchToProps = dispatch => ({
 otp:(auth,body,cb) => dispatch(AppActions.verify(auth,body,cb))
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
)(EnterOtp)