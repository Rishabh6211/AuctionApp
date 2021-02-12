import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../constant";
import { TextInput } from "react-native-paper";
export default class DesignedTextInput extends Component {
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
      maxLength = 50
    } = this.props;

    return (
      <TextInput
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        label={label}
        mode="flat"
        theme={{ colors: { primary: Colors.StrongPink } }}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        style={[styles.styleGlobal, styleGlobal]}
        value={value}
        editable={editable}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onKeyPress={this.props.onKeyPress}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        returnKeyType='done' 
        ref={ref}

        underlineColor={underlineColor}
        disabled={disabled}
        placeholder={placeholder}
        error={error}
        dense={dense}
      />
    );
  }
}

const styles = StyleSheet.create({
  styleGlobal: {
    width: "90%",
    minHeight: 45,
    backgroundColor: Colors.White,
  },
});
