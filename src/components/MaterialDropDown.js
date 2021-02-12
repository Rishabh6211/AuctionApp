import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { Colors } from "../constant";
import { moderateScale } from "react-native-size-matters";
export default class MaterialDropDown extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render() {
    let {
      label,
      styleGlobal,
      editable,
      placeholder = "",
      value = "",
      multiline,
      numberOfLines,
      keyboardType,
      underlineColor = "",
      secureTextEntry,
      disabled = false,
      error,
      dense,
      onBlur = () => { },
      onChangeText = () => { },
      onSubmitEditing = () => { },
      ref = () => { },
      maxLength = 50,
      isleftIcon = false,
      isRightIcon = false,
      rightIcon = "",
      leftIcon = "",
      rightIconStyle = {}
    } = this.props;

    return (
      <TouchableOpacity onPress={disabled == false ? this.props.rightButtonPress : console.log(disabled)} style={styles.styleGlobal}>
        <TextInput
          label={label}
          style={[styles.styleGlobal, styleGlobal]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          mode="outlined"
          theme={{ colors: { primary: Colors.Gray } }}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          value={value}
          editable={false}
          onBlur={onBlur}
          onChangeText={onChangeText}
          onKeyPress={this.props.onKeyPress}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          ref={ref}
          underlineColor={underlineColor}
          disabled={disabled}
          placeholder={placeholder}
          error={error}
          dense={dense}
        />
        <View style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: moderateScale(15) }}>
          <Image
            source={rightIcon}
            style={[{ height: 40, width: 40 }]}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  styleGlobal: {
    width: "100%",
    minHeight: 45,
    backgroundColor: Colors.White,
  },
});