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
  FlatList
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import {UpdatedHeader} from '../../components'
import { connect } from "react-redux";
import {sidebar} from '../../assets1'
import {Colors,Server_Url} from '../../constant'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import Icons from 'react-native-vector-icons/AntDesign'
import * as AppAction from '../../actions/'
import {truncateStr} from '../../helpers/'


class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
     auction:[],
     fixedCost:[]
    }
  }

  componentDidMount(){
    console.log('props---',this.props)
    
  }

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

  render() {
    console.log('props---',global.screen)
    return (
      <View style={{flex:1}}>  
<View style={{flex:0.11}}>
<UpdatedHeader
     leftIcon={true}
     Searchbar={true}
     leftPress={()=>Actions.pop()}
        />
        </View>
        <View style={{flex:0.85,justifyContent:'center',alignItems:'center'}}>
               <FlatList
          numColumns={2}
          data={this.props.text=="Auction"?this.props.auctionProduct:this.props.fixedCostProd}
          renderItem={({item})=>
          <TouchableOpacity style={{margin:10}} onPress={()=>Actions.productDetail({item:item})}> 
            {this.MyComponent(item)}
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
          />
          </View>
          </View>
  
    );
  }
}

const mapStateToProps = state => {
  console.log('state----',state)
  return {
    prductData : state.productReducer.productData?state.productReducer.productData:[],
    auctionProduct: state.productReducer.auctions?state.productReducer.auctions:[],
    fixedCostProd:state.productReducer.fixCost?state.productReducer.fixCost:[]
  };
};
const mapDispatchToProps = dispatch => ({
 getALLProduct:(cb) => dispatch(AppAction.getAllProduct(cb))
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex:1
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListing)