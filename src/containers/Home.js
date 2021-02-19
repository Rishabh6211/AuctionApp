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
import {toast} from '../utilities'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker';
import {redirectToSettings} from  '../helpers/'

var fixed_Cost=[];
var auctions=[]
var arrImage = []
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
     auction:[],
     fixedCost:[],
     addProduct:false,
     productImageData: [],
     multupleImage:[],
     image: null,
     images: [],
     title:'',
     address:'',
     contact:'',
     sPrice:'',
     fPrie:'',
     bidIncrement:'',
     bidDuration:'',
     description:'',
     type:'',
     loading:false
    
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

  ModalComponent = (data) => (
    

    <View style={{height:this.state.images.length>0? height*1.6:height*1.3,marginHorizontal:moderateScale(10)}}>
     <View style={styles.textInputStyle}>
     <DropDownPicker
    items={[
        {label: 'Auction', value: 'Auction', },
        {label: 'Fixed Cost', value: 'Fixed Cost'},
    ]}
    defaultValue={this.state.auctionType}
    containerStyle={{height: 50}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
   
    selectedLabelStyle={{
      color: Colors.Black
  }}
    placeholder="Choice of Auction"
    placeholderStyle={{color:Colors.black}}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
      auctionType: item.value
    })}
/>
       </View>
       <View style={styles.textInputStyle}>
     <DropDownPicker
    items={data}
    defaultValue={this.state.category}
    selectedLabelStyle={{
      color: Colors.Black
  }}
    containerStyle={{height: 50}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    placeholder="Select Category"
    placeholderStyle={{color:Colors.black}}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
      category: item.value
    })}
/>
       </View>
       <View style={styles.textInputStyle}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Title of product"
         value={this.state.title}
         onChangeText={(text)=>this.setState({title:text})}
         />
         </View>
        
         
       <View style={styles.textInputStyle}>
         <DesignedTextInput 
         styleGlobal={{width:'100%'}}
         label="Address"
         value={this.state.address}
         onChangeText={(text)=>this.setState({address:text})}
         />
         </View>
      
        
         
         <View style={styles.textInputStyle}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
         label="Contact"
         value={this.state.contact}
         onChangeText={(text)=>this.setState({contact:text})}
         />
         </View>
         <View style={{height:height*0.02}}/>
         <View style={styles.textInputStyle}>
     <DropDownPicker
    items={[
        {label: 'Day', value: 'day', },
        {label: 'hour', value: 'hour'},
    ]}
    defaultValue={this.state.bidType}
    selectedLabelStyle={{
      color: Colors.Black
  }}
  disabled={this.state.auctionType=="Auction"?false:true}
    containerStyle={{height: 50}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    placeholder="Bid Type"
    placeholderStyle={{color:Colors.black}}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
      bidType: item.value
    })}
/>
       </View>
       <View style={{...styles.textInputStyle, flexDirection:'row'}}>
           <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
           disabled={this.state.auctionType=="Auction"?false:true}
           editable={this.state.auctionType=="Auction"?true:false}
         label="Bid increment"
         value={this.state.bidIncrement}
         keyboardType={'numeric'}
         onChangeText={(text)=>this.setState({bidIncrement:text})}
         />
         </View>
         <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
           disabled={this.state.auctionType=="Auction"?false:true}
           editable={this.state.auctionType=="Auction"?true:false}
         label="Bid Duration"
         value={this.state.bidDuration}
         keyboardType={'numeric'}
         onChangeText={(text)=>this.setState({bidDuration:text})}
         />
         </View>
         </View>
         <View style={{...styles.textInputStyle, flexDirection:'row'}}>
           <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
           disabled={this.state.auctionType=="Auction"?false:true}
           editable={this.state.auctionType=="Auction"?true:false}
         label="Starting Price"
         value={this.state.sPrice}
         keyboardType={'numeric'}
         onChangeText={(text)=>this.setState({sPrice:text})}
         
         />
         </View>
         {console.log('type---',this.state.country)}
         <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
         <DesignedTextInput 
           styleGlobal={{width:'100%'}}
           disabled={this.state.auctionType=="Auction"?true:false}
           editable={this.state.auctionType=="Auction"?false:true}
         label="Fix price"
         value={this.state.fPrie}
         keyboardType={'numeric'}
         onChangeText={(text)=>this.setState({fPrie:text})}
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
                value={this.state.description}
                onChangeText={(value) => this.setState({description:value})}
              />
              </View>
         </View>
         <View style={{height:height*0.12,justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity onPress={()=>this.uploadImage()}>
           <Ficons name="upload" size={35}/>
           </TouchableOpacity>
           <Text>Upload images</Text>
           
        </View>
       
       {/* {this.state.multupleImage.length>0?
        <View style={{height:height*0.2}}>
          <FlatList
        data={this.state.multupleImage}
        renderItem={({item})=><View>
            <Image source={{uri:`data:${item.mime};base64,${item.data}`}}/>
        </View>}
        keyExtractor={item => item.id}
      />
         
          </View>:null} */}
         { this.state.images.length>0?<View style={{height:height*0.1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
  
                    {this.state.images ? this.state.images.map(i => <View
                                                                          key={i.uri}>{this.renderImage(i)}</View>) : null}
                    
                </View>:null}
                { this.state.images.length>0? <View style={{height:height*0.1}}/>:null}
         <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}}>
        <DesignedButton 
             buttonText="Add Product"

             onPress={()=>this.onAddProduct()}
             />
          </View>
   </View>
 );


   MyComponent = (item) => (
     <View style={{height:height*0.27,borderRadius:20}}>
       <View style={{height:height*0.22}}>
   <Image source={{ uri: `${Server_Url}/images/Products/${item.image[0]}` }} style={{height:150,width:180,alignSelf:'center',borderRadius:20}} />
   {/* <Image source={{ uri: 'https://cdn.carbuzz.com/gallery-images/original/230000/200/230257.jpg' }} style={{height:150,width:180,alignSelf:'center',borderRadius:20}} /> */}

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

  uploadImage = () => {
    this.ActionSheet.show();
  }

  onActionSheetPress = (index) => {
    //this.ActionSheet.show()
    if (index == 0) return;
    let value = index == 1 ? true : false;
    this.imagePicker(value)
  }
  renderImage(image) {
    console.log('image---',image)
    return <View style={{flex:0.2,marginHorizontal:moderateScale(5)}}><Image style={{width: 50, height: 90, resizeMode: 'contain',borderRadius:20}} source={image}/></View>
}

  imagePicker = (camera) => {
    
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple:true,
        maxFiles:5,
        includeBase64: true
      }).then(image => {
        // this.setState({multupleImage:image})
        this.setState({
          images: image.map(i => {
              console.log('received image', i);
              return {uri: i.path, type: i.mime,name: i.path.split("/").pop()};
          })
      });
        console.log('image-----',image)
        arrImage = image.map(i => {
          
          return {uri: i.path, type: i.mime,name: i.path.split("/").pop()};
      })
      }).catch((err) => {
        if (err == "Error: Required permission missing") {
          redirectToSettings()
        }
        console.log("rad", err)
      });
    
  };

  onAddProduct = () => {
console.log('state--',arrImage)
    const {
      auction,
      fixedCost,
      productImageData,
      multupleImage,
      images,
      title,
      address,
      contact,
      sPrice,
      fPrie,
      bidIncrement,
      bidDuration,
      description,
      type,
      auctionType,
      category,
      bidType

    } = this.state
    if(auctionType){
      if(category){
        if(title){
          if(contact){
            if(auctionType=="Auction"){
              if(bidType){
                if(bidIncrement){
                  if(bidDuration){
                    if(sPrice){
                      if(description){
                        if(images.length>0){
                          if(images.length<=5){
                            if(bidType === 'day'){
                              if(bidDuration>30){
                               return alert('Please select Bid Duration max 30 day')
                              }
                             if(bidDuration<1){
                             return alert('Please select Bid Duration min 1 day')
                             }
                            }
                            if(bidType === 'hour'){
                              if(bidDuration>24){
                               return alert('Please select Bid Duration max 24 hour')
                              }
                             if(bidDuration<1){
                             return alert('Please select Bid Duration min 1 hour')
                             }
                            }
                            //  ============

                            var formdata = new FormData();
formdata.append("categoryName", category);
formdata.append("title", title);
formdata.append("description", description);
formdata.append("address", address);
formdata.append("contactLister", contact);
formdata.append("auctionChoice", auctionType);
formdata.append("startingPrice", sPrice);
formdata.append("fixedPrice", fPrie);

if(arrImage.length>0){
  for(var i=0;i<= arrImage.length -1 ; i++){
    formdata.append("image", arrImage[i]);
  }
}




formdata.append("userId", this.props.loginData._id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

console.log('arrImg--',arrImage)
console.log('restOptions--',requestOptions)
this.setState({loading:true})

fetch("https://auctionnode.herokuapp.com/addProducts", requestOptions)
  .then(response => response.text())
  .then(result => {this.getALLProduct((data)=>{
    if(data){
      this.setState({loading:false,addProduct:false});toast({
        text:"Product Successfully Added",
        type:'success'
    })
    }
  })})
  .catch(error => this.setState({loading:false,addProduct:false}));

                            // ==============
                          }else{
                            alert('Please upload only 5 images')
                          }
          
                        }else{
                          alert('images are required')
                        }
          
                      }
                      else{
                        alert('Description is required')
                      }
                    }
                    else{
                      alert('Starting price is required')
                    }

                  }
                  else{
                    alert('Bid Duration is required')
                  }

                }
                else{
                  alert('Bid Increment is required')
                }

              }else{
                alert('Bid Type is required')
              }
            }
            else{
              if(auctionType=="Fixed Cost"){
                if(fPrie){
                  if(description){
                    if(images.length>0){
                      if(images.length<=5){



                          alert('Success')
                      }else{
                        alert('Please upload only 5 images')
                      }
      
                    }else{
                      alert('images are required')
                    }
      
                  }
                  else{
                    alert('Description is required')
                  }
                }
                else{
                  alert('fixed Cost is required')
                }
              }
            }
          
          }
          else{
            alert('Contact is required')
          }

        }
        else{
          alert('Title is required')
        }

      }
      else{
        alert('Category is required')
      }
      
    }
    else{
     alert('Choice of auction is required')
    }
  }

  onSubmit = (item) => {
    this.props.productDetail(item._id,(data)=>{
      if(data && data !== null){
        Actions.productDetail()
      }
    })
  }

  render() {

    const data =  this.props.categoryData.map(i => {
      console.log('received image', i);
      return {label: i.categoryName, value:i.categoryName};
  })

    const options = [
      <Text style={{ color: Colors.lightGray, fontSize: RFValue(16), fontWeight: "bold" }}>{"CANCEL"}</Text>,
      <Text style={{ color: Colors.lightGray, fontWeight: "bold" }}>{"OPEN GALLERY"}</Text>,
    ]
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
          <TouchableOpacity style={{margin:5}} onPress={()=>this.onSubmit(item)}> 
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
          <TouchableOpacity style={{margin:5}}onPress={()=>this.onSubmit(item)}> 
            {this.MyComponent(item)}
          </TouchableOpacity>
        }
          />
          </View>

          <View style={{height:height*0.1}}/>
       
 
        
       
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
              {this.ModalComponent(data)}
              </KeyboardAwareScrollView>

          </Modal>

          <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={0}
          onPress={(index) => { this.onActionSheetPress(index); }}
        />
          <Loader  loading={this.props.loader}/>
          <Loader  loading={this.state.loading}/>
     </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('state----',state)
  return {
    loginData : state.loginReducer.data?state.loginReducer.data:{},
    prductData : state.productReducer.productData?state.productReducer.productData:[],
    auctionProduct: state.productReducer.auctions?state.productReducer.auctions:[],
    fixedCostProd:state.productReducer.fixCost?state.productReducer.fixCost:[],
    loader:state.productReducer.loading?state.productReducer.loading:false,
    categoryData: state.productReducer.categoryData?state.productReducer.categoryData:[]

   
  };
};
const mapDispatchToProps = dispatch => ({
 getALLCategory:() => dispatch(AppAction.getAllCategory()),
 productDetail:(id,cb) => dispatch(AppAction.productDetail(id,cb)),
 getALLProduct:(cb) => dispatch(AppActions.getAllProduct(cb))

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