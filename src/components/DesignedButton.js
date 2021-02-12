import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constant";
import { Button } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
export default class DesignedButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      buttonText = "",
      style,
      icon = "",
      labelStyle,
      theme,
      uppercase,
      disabled,
      contentStyle,
      loading,
      dark,
      compact,
      color = Colors.RedicalRed,
      onPress = () => { },
      mode="contained"
    } = this.props;
    return (
      <Button
        mode={mode}
        color={color}
        compact={compact}
        icon={icon}
        dark={dark}
        loading={loading}
        disabled={disabled}
        uppercase={false}
        contentStyle={[styles.contentStyle, contentStyle]}
        style={[styles.styleGlobal, style]}
        labelStyle={labelStyle}
        theme={theme}
        labelStyle={styles.textStyle}
        onPress={onPress}>
        {buttonText}
      </Button>

    );
  }
}

const styles = StyleSheet.create({
  styleGlobal: {
    width: "90%",
    borderRadius:moderateScale(30)
  },
  contentStyle: {
    height: moderateScale(50),
    
  },
  textStyle:{
    fontSize: RFValue(16),
    // fontFamily:Fonts.robot_Medium
  }
});
