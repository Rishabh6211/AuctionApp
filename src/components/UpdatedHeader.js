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
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'
import Ficon from 'react-native-vector-icons/Ionicons'
export default class UpdatedHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { screenHeader = "",isLeftIcon=true,isRightText=false } = this.props;
  
      return (
        <View style={Style.container}>
            {this.props.leftIcon?<View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={this.props.leftPress}><Icon name="left" size={25}/></TouchableOpacity>
            </View>:null}
            {this.props.Searchbar?<View style={{flex:0.8,justifyContent:'center',marginHorizontal:10,marginVertical:20}}>
            <Searchbar
                placeholder="Search"
               style={{borderRadius:30}}
             />
            </View>:
            <View style={{flex:0.8,justifyContent:'center',alignItems:'center',marginHorizontal:10,marginVertical:20}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>{this.props.headerText}</Text>
             </View>
            }
            <View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity><Ficon name="notifications" size={25}/></TouchableOpacity>
            </View>
           {this.props.rightIcon?<View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={this.props.rightPress} ><Ficon name="menu" size={25}/></TouchableOpacity>
            </View>:null}
        </View>
      )
    
  }
}

const Style = ScaledSheet.create({
  container: {
   flex:1,
    width: "100%",
    backgroundColor:Colors.RedicalRed,
    flexDirection:'row'
  },
  body: {
    flex: 1,
    
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:Colors.RedicalRed
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
   
  }
});
