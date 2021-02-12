import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
TextInput
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale ,verticalScale} from 'react-native-size-matters'
import {UpdatedHeader,DesignedTextInput,DesignedButton,Loader} from '../components'
import { connect } from "react-redux";
import {menu_icon} from '../assets'
import {Colors,Server_Url} from '../constant'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import Icons from 'react-native-vector-icons/AntDesign'
import Ficons from 'react-native-vector-icons/Entypo'
import * as AppAction from '../actions/'
import {truncateStr} from '../helpers/'
import DropDownPicker from 'react-native-dropdown-picker';

var fixed_Cost=[];
var auctions=[]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
     auction:[],
     fixedCost:[],
     addProduct:false
    }
  }

  componentDidMount(){
    this.props.getALLCategory()
    this.setState({fixedCost:this.props.fixedCostProd.slice(0,4)})
    this.setState({auction:this.props.auctionProduct.slice(0,4)})
  }

  filterDataFixed(){
    fixed_Cost =  
    this.props.prductData.filter(item => item.auctionChoice == "Fixed Cost");
   console.log('newArray0000---',fixed_Cost)
   this.setState({fixedCost:fixed_Cost.slice(0,4)})
  }
  filterDataAuction(){
    auctions =  
    this.props.prductData.filter(item => item.auctionChoice == "Auction");
   console.log('newArray0000---',auctions)
   this.setState({auction:auctions.slice(0,4)})
  }

  ModalComponent = () => (
    <View style={{height:height*1.1,marginHorizontal:moderateScale(10)}}>
     <View style={styles.textInputStyle}>
     <DropDownPicker
    items={[
        {label: 'With Auction', value: 'Auction', },
        {label: 'Without  Auction', value: 'fixedCost'},
    ]}
    defaultValue={this.state.country}
    containerStyle={{height: 50}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    placeholder="Choice of Auction"
    placeholderStyle={{color:Colors.black}}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
        country: item.value
    })}
/>
       </View>
       <View style={styles.textInputStyle}>
     <DropDownPicker
    items={[
        {label: 'With Auction', value: 'Auction', },
        {label: 'Without  Auction', value: 'fixedCost'},
    ]}
    defaultValue={this.state.country}
    containerStyle={{height: 50}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    placeholder="Select Category"
    placeholderStyle={{color:Colors.black}}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
        country: item.value
    })}
/>
       </View>
       <View style={styles.textInputStyle}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Title of product"
         />
         </View>
        
         
       <View style={styles.textInputStyle}>
         <DesignedTextInput 
         styleGlobal={{width:'100%'}}
         label="Address"
         />
         </View>
      
        
         
         <View style={styles.textInputStyle}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Contact of lister"
         />
         </View>
         <View style={{...styles.textInputStyle, flexDirection:'row'}}>
           <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Starting Price"
         />
         </View>
         <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Fix price"
         />
         </View>
         </View>
         <View style={{...styles.textInputStyle, flexDirection:'row'}}>
           <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Bid increment"
         />
         </View>
         <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Bid Duration"
         />
         </View>
         </View>
        
          <View style={styles.textAreaView}>
            <View style={styles.textAreaContainer}>
          <TextInput
                style={styles.textArea}
                // underlineColorAndroid="transparent"
                placeholder='Description'
                placeholderTextColor={Colors.Gray}
                numberOfLines={10}
                multiline={true}
                returnKeyType='done'
                maxLength={200}
                onChangeText={(value) => alert('hello')}
              />
              </View>
         </View>
         <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}}>
        <DesignedButton 
             buttonText="Add Product"
             onPress={()=>alert('predd')}
             />
          </View>
   </View>
 );


   MyComponent = (item) => (
     <View style={{height:height*0.27,borderRadius:20}}>
       <View style={{height:height*0.22}}>
   {/* <Image source={{ uri: `${Server_Url}/images/Products/${item.image[0]}` }} style={{height:150,width:180,alignSelf:'center',borderRadius:20}} /> */}
   <Image source={{ uri: 'https://cdn.carbuzz.com/gallery-images/original/230000/200/230257.jpg' }} style={{height:150,width:180,alignSelf:'center',borderRadius:20}} />

   </View>
   
   <View style={{height:height*0.05,justifyContent:'center',alignItems:'center'}}> 
     
   <Text style={{alignSelf:'center'}}>{truncateStr(item.title,20)}</Text>
   {/* <Text style={{alignSelf:'center'}} >{truncateStr(item.description,25)}</Text> */}
</View>
    </View>
  );

  submit = (screen) => {
    global.screen = screen
    Actions.listing({text:screen})
  }

  render() {
    return (
      <View>
        <View style={{height:height*0.11}}>
        <UpdatedHeader
     rightIcon={true}
     Searchbar={true}
     rightPress={()=>Actions.drawerOpen()}
        />
        </View>
     <ScrollView style={{height:height}}>
      
     

        <View style={{height:height*0.03}}/>
        <View style={{height:height*0.04,marginHorizontal:moderateScale(20),flexDirection:'row',justifyContent:'space-between'}}>
          
          <Text  style={{fontSize:16,borderBottomWidth:1}}>Auction</Text>
          <TouchableOpacity onPress={()=>this.submit('Auction')}><Text>View All</Text></TouchableOpacity>
        </View>
        <View style={{height:height*0.02}}/>
        <View style={{height:height*0.6,marginHorizontal:moderateScale(10),justifyContent:'center',alignItems:'center'}}>
          <FlatList
          numColumns={2}
          data={this.state.auction}
          renderItem={({item})=>
          <TouchableOpacity style={{margin:5}} onPress={()=>Actions.productDetail({item:item})}> 
            {this.MyComponent(item)}
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
          />
          </View>
          {/* <View style={{height:height*0.03}}/> */}
        <View style={{height:height*0.04,marginHorizontal:moderateScale(20),flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:16,borderBottomWidth:1}}>Fixed Cost Ads</Text>
          <TouchableOpacity onPress={()=>this.submit('Fixed')}><Text>View All</Text></TouchableOpacity>
        </View>
        <View style={{height:height*0.01}}/>
        <View style={{height:height*0.65,marginHorizontal:moderateScale(10),justifyContent:'center',alignItems:'center'}}>
          <FlatList
          numColumns={2}
          data={this.state.fixedCost}
          renderItem={({item})=>
          <TouchableOpacity style={{margin:5}}onPress={()=>Actions.productDetail({item:item})}> 
            {this.MyComponent(item)}
          </TouchableOpacity>
        }
          />
          </View>

          <View style={{height:height*0.02}}/>
       
 
        
       
        </ScrollView>
         <View style={{position:'absolute',top: height*0.6, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
         <TouchableOpacity onPress={()=> this.setState({addProduct:true})}><Icons name="pluscircle" color={Colors.RedicalRed} size={60} /></TouchableOpacity>
     </View>

        <Modal
          visible={this.state.addProduct}
          style={{height:height,backgroundColor:Colors.White}}
        animationType='slide'
        >

          <View style={{height:height*0.1,flexDirection:'row'}}>
            <View style={{flex:0.9,justifyContent:'center',marginHorizontal:moderateScale(20)}}>
            <Text style={{fontSize:24}}>Add Product</Text>
            </View>
            <View style={{flex:0.1,justifyContent:'center',marginHorizontal:moderateScale(10)}}>
            <TouchableOpacity onPress={()=> this.setState({addProduct:false})}><Ficons name="cross" size={35} /></TouchableOpacity>
            </View>
            </View>
            <KeyboardAwareScrollView >
              {this.ModalComponent()}
              </KeyboardAwareScrollView>

          </Modal>
          <Loader  loading={this.props.loader}/>
     </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('state----',state)
  return {
    prductData : state.productReducer.productData?state.productReducer.productData:[],
    auctionProduct: state.productReducer.auctions?state.productReducer.auctions:[],
    fixedCostProd:state.productReducer.fixCost?state.productReducer.fixCost:[],
    loader:state.productReducer.loading?state.productReducer.loading:false,
   
  };
};
const mapDispatchToProps = dispatch => ({
 getALLCategory:() => dispatch(AppAction.getAllCategory())
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex:1
  },
  textInputStyle:{
    height:height*0.1
  },
  textAreaContainer: {
    borderColor: Colors.boderGray,
    borderWidth: 1,
    borderRadius: moderateScale(5),
    padding: 5,

  },
  textArea: {
    height: height*0.2,
    textAlignVertical: "top",
    fontSize: RFValue(16),
    color: Colors.DimGrayText
   
  },
  textAreaView: {
    height: height * 0.2,
    // marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(15),
   
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)