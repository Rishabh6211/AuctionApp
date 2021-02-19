import React, { Component } from "react";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Keyboard,
  FlatList
} from "react-native";
import { connect, bindActionCreators } from "react-redux";
import { Actions } from "react-native-router-flux";
import {Colors} from '../constant'
import Icons from 'react-native-vector-icons/Entypo'
import { Avatar } from 'react-native-paper';
import * as AppActions from '../actions'

const { height, width } = Dimensions.get("window");
// const happpheLogo = require("../../assets/images/blue_logo.png");
import {  icon } from "../assets";

const refineText = (str, l) => {
  if (str) return str.substring(0, l);
};
class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategory:true
    };
  }


  componentDidMount(){
   
  }

  listing = () => {
    let userId = this.props.loginData._id
    this.props.listingData(userId)
  }

  categoryDatas = (category) => {
    let auth = {}
    let body = {
      categoryName:category
    }
    
    this.props.categoryProductData(auth,body)
  }

  render() {
    const data = [{'name':'Rishabh'},{'name':'Rishabh1'},{'name':'Rishab2'},{'name':'Rishab2'},{'name':'Rishab2'},{'name':'Rishab2'},{'name':'Rishab2'},{'name':'Rishab2'},{'name':'Rishab2'}]
    return (
      <View style={styles.sidemenumaindiv}>
        <View style={styles.topContainer} >
         <View style={{flex:0.2}}/>
         <TouchableOpacity style={{flex:0.8,flexDirection:'row'}} onPress={()=>{Actions.profile();Actions.drawerClose();}}>
           <View style={{flex:0.3,justifyContent:'center',alignItems:'center'}}>
           <Avatar.Image size={80} source={{uri:'https://mpng.subpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg'}} />
             </View>
             <View style={{flex:0.5,justifyContent:'center'}}>
    <Text style={{fontSize:20}}>{this.props.loginData.name}</Text>
               <Text>{this.props.loginData.phone}</Text>
               </View>
               <View style={{flex:0.2,justifyContent:'center'}}>
                 <Icons name="chevron-right" size={25} />
                 </View>
          </TouchableOpacity>
        
        <Icons name="circle-with-cross" size={30} style={{position:'absolute'}} onPress={()=>Actions.drawerClose()}/>
        </View>
        <View >
          <TouchableOpacity
            style={styles.breakitems}
            
            onPress={() => {
              Actions.drawerClose();
              Actions.home();
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.15,justifyContent:'center',alignItems:'center' }}>
                <Icons color="#484848" name="home" size={20} />
              </View>
              <View style={{ flex: 0.75 }}>
                <Text
                  style={{
                    fontSize:height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                Home
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
           
            onPress={() => {
              Actions.drawerClose();
              this.listing();
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
            <View style={{ flex: 0.15,justifyContent:'center',alignItems:'center' }}>
              <Icons color="#484848" name="list" size={20} />
              </View>
              <View style={{ flex: 0.75 }}>
                <Text
                  style={{
                    fontSize:  height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"My Listing"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
           
            onPress={() => {
            
              Actions.drawerClose();
            
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
            <View style={{ flex: 0.15,justifyContent:'center',alignItems:'center' }}>
              <Icons color="#484848" name="mail" size={20} />
              </View>
              <View style={{ flex: 0.75 }}>
                <Text
                  style={{
                    fontSize:  height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"Contact Us"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideItem}  onPress={() => {
              Actions.drawerClose();
             
              Keyboard.dismiss
            }}>
            <View style={{ flex: 0.15,justifyContent:'center',alignItems:'center' }}>
              <Icons color="#484848" name="grid" size={20} />
              </View>
              <View style={{ flex: 0.7}}>
                <Text
                  style={{
                    fontSize: height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"Category"}
                </Text>
               
              </View>
             {this.state.showCategory? <TouchableOpacity style={{ flex: 0.1,justifyContent:'center',alignItems:'center' }} onPress={()=>this.setState({showCategory:false})}>
               <Icons color="#484848" name="plus" size={20} />
              </TouchableOpacity>:
               <TouchableOpacity style={{ flex: 0.1,justifyContent:'center',alignItems:'center' }} onPress={()=>this.setState({showCategory:true})}>
               <Icons color="#484848" name="minus" size={20} />
              </TouchableOpacity>
              }
            </TouchableOpacity>
           {!this.state.showCategory? <View style={{height:height*0.5}}>
           <FlatList
        data={this.props.categoryData}
        renderItem={({item})=>
        <TouchableOpacity
        style={styles.breakitems}
       
        onPress={() => {
          Actions.drawerClose();
          this.categoryDatas(item.categoryName)
          Keyboard.dismiss
        }}
      >
        <View style={styles.sideItem}>
        <View style={{ flex: 0.1,justifyContent:'center',alignItems:'center' }}>
          {/* <Icons color="#484848" name="list" size={20} /> */}
          </View>
          <View style={{ flex: 0.75 }}>
            <Text
              style={{
                fontSize:  height * 0.025,
                textAlign: "left",
                color: "#484848",
                fontWeight: "normal"
              }}
            >
              {item.categoryName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      }
        keyExtractor={item => item.id}
      />
            </View>:null}
          <TouchableOpacity
            style={styles.breakitems}
           
            onPress={() => {
              Actions.drawerClose();
             Actions.login();
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
            <View style={{ flex: 0.15,justifyContent:'center',alignItems:'center' }}>
              <Icons color="#484848" name="log-out" size={20} />
              </View>
              <View style={{ flex: 0.75}}>
                <Text
                  style={{
                    fontSize: height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"logout"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topContainer: {
    height: height * 0.2,
    backgroundColor: Colors.RedicalRed
  },
  avtarContainer: {
    height: height * 0.17,
    width: width * 0.24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  topTextContainer: {
    height: height * 0.13,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.01,
    flexDirection: "column",
    backgroundColor: "red"
  },
  textView: {
    flex: 1,
    flexDirection: "row",
    marginBottom: height * 0.02
  },

  sidemenumaindiv: {
    flex: 1,
    flexDirection: "column"
  },
  sidemenuitems: {
    padding: 10,
    paddingBottom: 0,
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  imageView: { flex: 0.25, justifyContent: "center", alignItems: "center" },
  breakitems: {
    // marginHorizontal: width * 0.08,
    height: height * 0.08,
    flexDirection: "row",
    alignItems: "center"
  },
  sideItem: {
    
    flexDirection: "row",
    alignItems: "center",
    alignSelf:'center',
    height: height * 0.07,
    borderBottomColor: "#dadada",
    borderBottomWidth: 1,
  
    width: '100%'
  }
});

const mapStateToProps = state => {
 
  return {
   loginData : state.loginReducer.data?state.loginReducer.data:{},
   categoryData: state.productReducer.categoryData?state.productReducer.categoryData:[]
  };
};

const mapDispatchToProps = dispatch => {
  return {
   listingData:(id) => dispatch(AppActions.myListing(id)),
   categoryProductData:(auth,body) => dispatch(AppActions.categoryByProduct(auth,body))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
