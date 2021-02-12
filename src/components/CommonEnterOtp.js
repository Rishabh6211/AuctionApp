import React, { Component } from "react";
import {
  View,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import { DesignedButton, Loader } from ".";
import { Header } from ".";
import { styles, Colors } from "../constant";
import { RFValue } from "react-native-responsive-fontsize";
import { backarrow } from "../assets";
import { Actions } from "react-native-router-flux";
const { height } = Dimensions.get("window");

class CommonEnterOtp extends Component {
  constructor(props) {
    super(props);
    this.otpValue;
    this.state = {
      mobileNumber: "",
      otpValue: "",
      first: "",
      second: "",
      three: "",
      four: "",
      five: "",
      mobileNumberError: false,
      pin: "",
    };
  }

  resetFocus() {
    if (this.otpValue.isFocused) {
      this.otpValue.blur();
    }
    setTimeout(() => {
      this.otpValue.focus();
    }, 200);
  }

  displayMaskedPhone() {
    var str = this.props.mobileNumber;
    var str1 = str[0] + str[1];
    for (var i = 0; i < str.length - 2; i++) {
      str1 += "x";
    }
    return str1;
  }

  render() {
    let {
      title = "",
      mobileNumber,
      onChangeTextPress = () => {},
      submit = () => {},
      resendOTP = () => {},
      value = "",
      maxLength = 4,
      loading = false,
      otpValue=[]
    } = this.props;

    return (
      <View style={[styles.container, styles.flex1]}>
        <Header
          leftIcon={backarrow}
          text="OTP"
          leftButtonPress={() => Actions.pop()}
        />
        <View style={{flex:0.3}}/>
        <View style={styles.baseContent1}>
          <Text style={Style.subHeading}>
            {title}
            {this.displayMaskedPhone()}
          </Text>
          <View style={Style.otpContainer}>
            <TouchableOpacity
              style={Style.otpBox}
              onPress={() => {
                this.resetFocus();
              }}
            >
              <Text style={Style.otpText}>{otpValue[0]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Style.otpBox}
              onPress={() => {
                this.resetFocus();
              }}
            >
              <Text style={Style.otpText}>{otpValue[1]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Style.otpBox}
              onPress={() => {
                this.resetFocus();
              }}
            >
              <Text style={Style.otpText}>{otpValue[2]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Style.otpBox}
              onPress={() => {
                this.resetFocus();
              }}
            >
              <Text style={Style.otpText}>{otpValue[3]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Input Fields there but hidden */}
        <TextInput
          style={{ height: 0, width: 0 }}
          autoCapitalize="none"
          maxLength={maxLength}
          ref={(input) => {
            this.otpValue = input;
          }}
          autoCorrect={false}
          keyboardType="numeric"
          returnKeyType="done"
          placeholder=""
          placeholderTextColor="#c6cad2"
          value={value}
          returnKeyType='done'
          onChangeText={onChangeTextPress}
        />

        <TouchableOpacity onPress={resendOTP}>
          <Text style={Style.resendOTP}>Resend Otp</Text>
        </TouchableOpacity>

        <View style={Style.bottomButton}>
          <DesignedButton buttonText={'Submit'} onPress={submit} />
        </View>

        <Loader loading={loading} />
      </View>
    );
  }
}

const Style = ScaledSheet.create({
  otpContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignSelf: "center",
    marginTop: "10%",
    marginBottom: "10%",
  },
  otpBox: {
    width: "20%",
    height: height * 0.09,
    borderColor: Colors.Silver,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth: 2,
    borderRadius:moderateScale(10)
  },
  header: {
    height: 50,
    marginTop: "15%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: moderateScale(20),
  },
  resendOTP: {
    fontSize: RFValue(14),
    textAlign: "right",
    color: "#c28b23",
    alignSelf: "flex-end",
    // fontFamily:Fonts.robot_Medium,
    marginRight: moderateScale(20),
    marginTop: moderateScale(20),
  },
  bottomButton: {
    position: "absolute",
    bottom: moderateScale(20),
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  subHeading: {
    marginLeft: moderateScale(10),
    fontSize: RFValue(14),
    width: "90%",
    alignSelf: "center",
    fontWeight: "bold",
  },
  otpText: {
    fontSize: RFValue(30),
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonEnterOtp);
