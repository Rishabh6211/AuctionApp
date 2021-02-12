import React, { Component } from "react";
import { View, ImageBackground, Image, TouchableOpacity, Text } from "react-native";
import {
  verticalScale,
  moderateScale,
  ScaledSheet,
} from "react-native-size-matters";
import { header } from "../assets";
import { styles, Colors } from "../constant";
import { RFValue } from "react-native-responsive-fontsize";
import {
  menuIcon,
  rightarrow,
  sendmoneyIcon,
  nameBackgound,
  handshake,
} from '../assets';
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { screenHeader = "",isLeftIcon=true,isRightText=false } = this.props;
    if (screenHeader == "Home") {
      return (
        <View
          style={[this.props.headerStyle ? this.props.headerStyle : Style.container, {
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : Colors.White,
          },]}
        >
          <View style={{ flex: 0.2 }} />
          <View style={Style.body}>
           <TouchableOpacity
              onPress={this.props.leftButtonPress}
            >
              <Image
                source={this.props.leftIcon}
                style={{ height: 30, width: 30, tintColor: this.props.leftTintColor ? this.props.leftTintColor : null }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                ...Style.textStyle,
                color: this.props.fontColor
                  ? this.props.fontColor
                  : Colors.Black,
              }}
            >
              {this.props.text}
            </Text>
            <TouchableOpacity style={Style.rightIcon}
              onPress={this.props.rightButtonPress}
            >
              {this.props.isRightIconURI == true ?
                <Image
                  source={{ uri: this.props.rightIcon }}
                  style={[this.props.rightIconStyle ? this.props.rightIconStyle : { height: 30, width: 30, borderRadius: 15 },]}
                  resizeMode="cover"
                />
                :
                <ImageBackground
                  source={nameBackgound}
                  style={[this.props.rightIconStyle ? this.props.rightIconStyle : { height: 35, width: 35 }, styles.justifyContentCenter]}
                  resizeMode="contain"
                >
                  <Text
                    style={{
                      ...Style.rightTextStyle,
                      color: this.props.rightFontColor
                        ? this.props.rightFontColor
                        : Colors.White,
                    }}
                  >
                    {this.props.rightText}
                  </Text>
                </ImageBackground>
              }
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View
          style={[this.props.headerStyle ? this.props.headerStyle : Style.container, {
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : Colors.White,
          },]}
        >
          <View style={{ flex: 0.2 }} />
          <View style={Style.body}>
           {isLeftIcon == true ? <TouchableOpacity
              onPress={this.props.leftButtonPress}
            >
              <Image
                source={this.props.leftIcon}
                style={{ height: 30, width: 30, tintColor: this.props.leftTintColor ? this.props.leftTintColor : null }}
                resizeMode="contain"
              />
            </TouchableOpacity>:<View style={{marginHorizontal:moderateScale(5)}}></View>}
            <Text
              style={{
                ...Style.textStyle,
                color: this.props.fontColor
                  ? this.props.fontColor
                  : Colors.Black,
              }}
            >
              {this.props.text}
            </Text>
           {isRightText == true
           ?
           <TouchableOpacity style={Style.rightIcon}
              onPress={this.props.rightButtonPress}
            >
             <Text style={this.props.rightTextStyle}>{this.props.rightText}</Text>
            </TouchableOpacity>
           : <TouchableOpacity style={Style.rightIcon}
              onPress={this.props.rightButtonPress}
            >
              <Image
                source={this.props.rightIcon}
                style={[this.props.rightIconStyle ? this.props.rightIconStyle : { height: 30, width: 30 },]}
                resizeMode="contain"
              />
            </TouchableOpacity>}
          </View>
        </View>
      )
    };
  }
}

const Style = ScaledSheet.create({
  container: {
    height: 50,
    width: "100%",
    alignContent: "center"
  },
  body: {
    flex: 0.7,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontSize: RFValue(20),
    // fontFamily: Fonts.robot_Medium,
    textAlign: "left"
  },
  rightTextStyle: {
    fontSize: RFValue(13),
    // fontFamily: Fonts.robot_Medium,
    textAlign: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 10,
  }
});
