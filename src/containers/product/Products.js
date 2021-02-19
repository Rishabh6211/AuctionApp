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


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
     auction:[],
     fixedCost:[],
     loginUser:false

    }
  }

  componentDidMount(){

    
  }


  onSubmit = (item) => {
    this.props.productDetail(item._id,(data)=>{
      if(data && data !== null){
        Actions.productDetail()
      }
    })
  }

   MyComponent = (item) => (
     <View style={{height:height*0.27,borderRadius:20}}>
       <View style={{height:height*0.22}}>
   <Image source={{ uri: `${Server_Url}/images/Products/${item.image[0]}` }} style={{height:150,width:180,alignSelf:'center',borderRadius:20}} />
   {/* <Image source={{ uri: 'https://cdn.carbuzz.com/gallery-images/original/230000/200/230257.jpg' }} style={{height:150,width:180,alignSelf:'center',borderRadius:20}} /> */}

   </View>
   
   <View style={{height:height*0.05,justifyContent:'center',alignItems:'center'}}> 
     
   <Text style={{alignSelf:'center'}}>{truncateStr(item.title,20)}</Text>
   {/* <Text style={{}}>{this.props.loginUser?'edit':''}</Text> */}
   {/* <Text style={{alignSelf:'center'}} >{truncateStr(item.description,25)}</Text> */}
</View>
    </View>
  );

  render() {
   
    console.log('props---123',this.props,this.state)
    return (
      <View style={{flex:1}}>  
<View style={{flex:0.11}}>
<UpdatedHeader
     rightIcon={true}
     Searchbar={true}
     rightPress={()=>Actions.drawerOpen()}
        />
        </View>
        {this.props.listingData.length>0?<View style={{flex:0.85,justifyContent:'center',alignItems:'center'}}>
               <FlatList
          numColumns={2}
          data={this.props.listingData}
          renderItem={({item})=>
          <TouchableOpacity style={{margin:10}} onPress={()=>this.onSubmit(item)}> 
            {this.MyComponent(item)}
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
          />
          </View>:
          <View style={{flex:0.85,justifyContent:'center',alignItems:'center'}}>
              <Text>You havn't added any product yet</Text>
          </View>
          }
          </View>
  
    );
  }
}

const mapStateToProps = state => {
  console.log('state----',state)
  return {
    loginData : state.loginReducer.data?state.loginReducer.data:{},
    listingData : state.productReducer.listingData?state.productReducer.listingData:[],
  };
};
const mapDispatchToProps = dispatch => ({
  productDetail:(id,cb) => dispatch(AppAction.productDetail(id,cb))
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
)(Products)