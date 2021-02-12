import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform
} from "react-native";
import { logo , backarrow} from '../../assets/'
import { DesignedTextInput,DesignedButton,Header, Loader } from '../../components/'
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors,emptyEmail, emailReg,phoneReg, invalidEmail, emptyPassword,emptyMobile, firstName, lastName , invalidPhone,invalidName} from '../../constant'
const { height } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import * as AppActions from '../../actions'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            address:'',
            nameError: '',
            passwordError: false,
            invalidEmailAddress: false,
            emailError: false,
            phoneError:false,
            invalidPhone:false,
            loading:false
        }
    }

    submit = () => {
        Actions.otp({phone: this.state.phone})
        let {
            phone,
            name,
            email,
            password,
            contact
        } = this.state;
        if(phone){
            if (phoneReg.test(phone)) {
            if(name){
                if (email) {
                    if (emailReg.test(email)) {
                        this.setState({ invalidEmail: false })
                        if (password) {
                            this.setState({loading:true})

                            let auth = {}
                            let body = {
                                phone:this.state.phone,
                                username:this.state.name,
                                password: this.state.password,
                                email: this.state.email,
                                Address: this.state.address
                                // device: {
                                //     "type": Platform.OS
                                // },
                            }

                            this.props.signup(auth,body,(data)=>{
                                this.setState({loading:false})
                                if(data !== null){
                                    Actions.otp({phone: this.state.phone})
                                }
                            }).catch((err)=> this.setState({loading:false}))
                        }
                        else {
                            this.setState({ passwordError: true });
                        }
                    }
                    else {
                        this.setState({ emailError: true, invalidEmailAddress: true });
                    }
                }
                else {
                    this.setState({ emailError: true });
                }
            }
            else {
                this.setState({ nameError: true });
            }
           
        }
        else{
            this.setState({phoneError: true,invalidPhone: true});
        }
    }
   
    
        else {
            this.setState({phoneError: true});
        }
      
    }

    errorView = type => {
        return (
            <View style={{paddingTop: 1,marginHorizontal:20}}>
                <Text style={styles.errorTexts}>
                    {
                        type === "phone" && this.state.invalidPhone
                            ? invalidPhone
                            : type === 'phone'
                            ? emptyMobile
                            : type === "email" && this.state.invalidEmailAddress
                                ? invalidEmail
                                : type === "email"
                                    ? emptyEmail
                                    : type === "password"
                                        ? emptyPassword
                                        : type === "name"
                                            ? invalidName
                                            : ''

                    }
                </Text>
            </View>
        );
    };

    render() {
        return (
          
            <View style={{ flex:1,backgroundColor:Colors.White }} >
            
              <Header
              leftIcon={backarrow}
              text="Sign Up"
              leftButtonPress={() => Actions.pop()}
            />
               
                
    <KeyboardAwareScrollView
    contentContainerStyle={{height:height*0.9}}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    enableAutomaticScroll={true}
    
       
    >
      
               
              <View style={{flex:0.1}}/>
             <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
             <DesignedTextInput
             label="Phone Number*"
             keyboardType={'numeric'}
             value={this.state.phone}
             maxLength={10}
             onChangeText= {(phone)=>this.setState({phone,phoneError:false}) }
             />
               </View>
               {this.state.phoneError ? this.errorView("phone") : null}
               <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
             <DesignedTextInput
             label="Full Name*"
             value={this.state.name}
             onChangeText= {(name)=>this.setState({name,nameError:false}) }
             />
             
               </View>
               {this.state.nameError ? this.errorView("name") : null}
               <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
             <DesignedTextInput
             label="Email*"
             value={this.state.email}
             onChangeText= {(email)=>this.setState({email,emailError:false}) }
             />
             
               </View>
               {this.state.emailError ? this.errorView("email") : null}
               <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
             <DesignedTextInput
             label="Password*"
             value={this.state.password}
             secureTextEntry={true}
             onChangeText= {(password)=>this.setState({password,passwordError:false}) }
             />
               </View>
               {this.state.passwordError ? this.errorView("password") : null}
               <View style={{flex:0.13,justifyContent:'center',alignItems:'center'}}>
             <DesignedTextInput
             label="Address"
             value={this.state.address}
             onChangeText= {(address)=>this.setState({address}) }
             />
               </View>
               <View style={{flex:0.1}}/>
               <View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}>
                 <DesignedButton 
                 buttonText="Continue"
                 onPress={()=>this.submit()}
                 />
                 </View>
               
                  </KeyboardAwareScrollView>
                  <Loader loading={this.state.loading} />
              </View>
        )}    
}

const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => ({
    signup:(auth,body,cb) => dispatch(AppActions.SignUp(auth,body,cb))
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
        height: height * 0.65,
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
)(Signup)