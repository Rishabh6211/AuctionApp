import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions, Modal } from "react-native";
import { Colors } from "../constant";
import { connect } from "react-redux";
const height = Dimensions.get("window").height;
class Loading extends Component {
  render() {

    let { loading } = this.props;
    let _loading = loading
    if (global.nextAction == "exit") {
      _loading = false
    }
    if (!_loading) {
      return null;
    }
    return (
      <View style={{}}>
        <Modal visible={_loading} transparent={true}>
          <View style={Styles.mainContainer}>
            <View style={Styles.innerView}>
              <ActivityIndicator size="large" color={Colors.RedicalRed} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.transParentColor,
    // position: "absolute",
    zIndex: 9999,
    flex: 1,


    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  innerView: { flex: 1, justifyContent: "center", alignItems: "center" },
});
const mapStateToProps = state => ({
  //   loading: state.app.loading,
});
export default connect(
  mapStateToProps,
  null,
)(Loading);