import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";
import { Colors } from "../constant";
export default class DesignedTextInputWithImage extends Component {
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
      disabled,
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
      imageStyle={},
      rightIconStyle = {}
    } = this.props;

    return (
      <View style={styles.containerStyle}>
        {isleftIcon == true &&
          <TouchableOpacity onPress={this.props.leftButtonPress}>
            <Image
              source={leftIcon}
              style={{ height: 25, width: 25, tintColor: "red", marginLeft: 10 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
        <TextInput
          style={[styles.styleGlobal, styleGlobal]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          value={value}
          editable={editable}
          onBlur={onBlur}
          onChangeText={onChangeText}
          onKeyPress={this.props.onKeyPress}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          ref={ref}
          returnKeyType='done' 

          underlineColor={underlineColor}
          disabled={disabled}
          placeholder={placeholder}
          error={error}
          dense={dense}
        />
        {
          isRightIcon == true &&
          <TouchableOpacity style={[rightIconStyle ? rightIconStyle : styles.rightIcon]}
            onPress={this.props.rightButtonPress}
          >
            <Image
              source={rightIcon}
              style={[{ height: 40, width: 40 }, imageStyle]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  styleGlobal: {
    width: "85%",
    height: 50,
    backgroundColor: "#FFF",
    marginLeft: 5,
    fontSize: 16
  },
  rightIcon: {
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  containerStyle: {
    width: "90%",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.Gray,
    marginBottom: 5,
    borderRadius: 5,
    height: 55
  }
});
