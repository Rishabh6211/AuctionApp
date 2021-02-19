import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {logo, backarrow} from '../../assets/';
import {RFValue} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  emptyEmail,
  emailReg,
  invalidEmail,
  emptyPassword,
  Colors,
  phoneReg,
  emptyMobile,
  invalidPhone,
} from '../../constant';
const {height} = Dimensions.get('window');
import {
  DesignedTextInput,
  DesignedButton,
  Header,
  Loader,
} from '../../components/';
import {Actions} from 'react-native-router-flux';
import * as AppActions from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      passwordError: false,
      phoneError: false,
      invalidPhone: false,
      loading: false,
    };
  }

  componentDidMount() {}

  submit = () => {
    let {phone, password} = this.state;

    if (phone) {
      if (phoneReg.test(phone)) {
        this.setState({invalidPhone: false});
        if (password) {
          let auth = {};
          let body = {
            password: this.state.password,
            phone: this.state.phone,
            // device: {
            //   type: Platform.OS,
            // },
          };
          this.setState({loading: true});
          this.props
            .login(auth, body, (data) => {
              console.log('data---', data);
              if (data && data !== null) {
                console.log('dtata----inside');
                this.props.getALLProduct((response) => {
                  this.setState({loading: false});
                  if (response && response !== null) {
                    Actions.push('drawer');
                  }
                });
              } else {
                this.setState({loading: false});
              }
            })
            .catch((err) => this.setState({loading: false}));
        } else {
          this.setState({passwordError: true});
        }
      } else {
        this.setState({phoneError: true, invalidPhone: true});
      }
    } else {
      this.setState({phoneError: true});
    }
  };

  errorView = (type) => {
    return (
      <View style={{paddingTop: 1, marginHorizontal: 20}}>
        <Text style={styles.errorTexts}>
          {type === 'phone' && this.state.invalidPhone
            ? invalidPhone
            : type === 'phone'
            ? emptyMobile
            : emptyPassword}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.White}}>
        <View
          style={{
            height: height * 0.15,
            justifyContent: 'flex-end',
            marginHorizontal: moderateScale(20),
          }}>
          <Text style={{fontSize: 32}}>SignIn</Text>
        </View>
        <View
          style={{
            height: height * 0.01,
            marginHorizontal: moderateScale(20),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.25,
              borderBottomWidth: 2,
              borderBottomColor: Colors.boderGray,
            }}></View>
        </View>
        <View style={{height: height * 0.07}} />

        <KeyboardAwareScrollView
          contentContainerStyle={{height: height * 0.9}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}>
          <View
            style={{
              flex: 0.13,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <DesignedTextInput
              label="Phone Number*"
              keyboardType={'numeric'}
              value={this.state.phone}
              onChangeText={(phone) =>
                this.setState({phone, phoneError: false})
              }
            />
          </View>
          {this.state.phoneError ? this.errorView('phone') : null}
          <View
            style={{
              flex: 0.13,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <DesignedTextInput
              label="Password*"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={(password) =>
                this.setState({password, passwordError: false})
              }
            />
          </View>
          {this.state.passwordError ? this.errorView('password') : null}

          <View style={{flex: 0.1}} />
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <DesignedButton buttonText="Log in" onPress={() => this.submit()} />
          </View>
          <View
            style={{
              flex: 0.05,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => Actions.signup()}>
              <Text style={{textDecorationLine: 'underline'}}>
                Don't have an account? Signup
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.05,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => Actions.forgot()}>
              <Text style={{textDecorationLine: 'underline'}}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <Loader loading={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ProductData: state.productReducer.productData
      ? state.productReducer.productData
      : {},
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: (auth, body, cb) => dispatch(AppActions.login(auth, body, cb)),
  getALLProduct: (cb) => dispatch(AppActions.getAllProduct(cb)),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  bottomTextContainer: {
    height: height * 0.15,
  },
  buttonView: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    // flexDirection: "row"
  },
  fieldView: {
    height: height * 0.3,
    marginHorizontal: moderateScale(20),
  },
  field: {
    height: height * 0.12,
  },
  errorTexts: {
    color: '#cc0000',
    fontSize: moderateScale(13),
    textAlign: 'left',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
