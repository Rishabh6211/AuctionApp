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
import Swiper from 'react-native-swiper'
import { Card, Title, Paragraph } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome'

class ProductDetail extends Component {
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

  renderPage(index){
    return (
        <View style={styles.slide1}>
    <Image style={{height:'100%',width:'100%'}} resizeMode="stretch" source={this.props.item.image[index]}/>
    </View>
    )
}

  render() {
    console.log('props---',this.props)
    const productImage = this.props.item.image.map((it, idx) => {
        return this.renderPage(idx);
   })
    return (
      <View style={{height:height}}>  
<View style={{height:height*0.1}}>
<UpdatedHeader
     leftIcon={true}
     leftPress={()=>Actions.pop()}
     headerText={this.props.item.title}
        />
        </View>
       <ScrollView>
        {/* <View style={{flex:0.01}}/> */}
        <View style={{height:height*0.35}}>
        <Swiper style={styles.wrapper} >
           {productImage}
      </Swiper>
      </View>
      <View style={{height:height*0.01}}/>
     {this.props.item.auctionChoice=="Auction"? <CountDown
        until={1000}
        // onFinish={() => alert('finished')}
        // onPress={() => alert('hello')}
        size={20}
      />:null}
      {/* <View style={{height:height*0.05,marginHorizontal:10}}>
      <Card style={{backgroundColor:Colors.silverWhite,justifyContent:'center'}}>
   
      <Title style={{fontSize:20,alignSelf:'center'}}>Auction : 1:12:23</Title>
  
    </Card>
          </View> */}
          <View style={{height:height*0.01}}/>
      <View style={{height:height*0.15,marginHorizontal:10}}>
      <Card style={{backgroundColor:Colors.silverWhite}}>
    <Card.Content>
    <Title>{this.props.item.title}</Title>
      <Paragraph>{this.props.item.description}</Paragraph>
    </Card.Content>
    </Card>
          </View>
        
          <View style={{height:height*0.15,flexDirection:'row'}}>
              <View style={{flex:0.5,marginHorizontal:moderateScale(10)}}>
      <Card style={{backgroundColor:Colors.silverWhite}}>
    <Card.Content>
    <Title>Product Type</Title>
      <Paragraph>{this.props.item.auctionChoice}</Paragraph>
      
    </Card.Content>
    </Card>
    </View>
   
    <View style={{flex:0.5,marginHorizontal:moderateScale(10)}}>
      <Card style={{backgroundColor:Colors.silverWhite}}>
    <Card.Content>
    <Title>Category</Title>
      <Paragraph>{this.props.item.categoryName}</Paragraph>
      
    </Card.Content>
    </Card>
    </View>
    
          </View>
          <View style={{height:height*0.15,marginHorizontal:10}}>
      <Card style={{backgroundColor:Colors.silverWhite}}>
    <Card.Content>
    <Paragraph>Address : {this.props.item.address}</Paragraph>
      <Paragraph>Price : {this.props.item.startingPrice}$</Paragraph>
    </Card.Content>
    </Card>
          </View>
          <View style={{height:height*0.05,justifyContent:'flex-start',marginHorizontal:moderateScale(10)}}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>Contact on</Text>
              </View>
              <View style={{height:height*0.1,justifyContent:'flex-start',marginHorizontal:moderateScale(10),flexDirection:'row'}}>
              <Icon name="telegram" size={35} color="#0088cc"/>
              <Icon name="whatsapp" size={40} color="#4FCE5D" style={{marginLeft:10}}/>
              </View>
              <View style={{height:height*0.01}}/>
          </ScrollView>
          </View>
  
    );
  }
}

const mapStateToProps = state => {
  console.log('state----',state)
  return {
    
  };
};
const mapDispatchToProps = dispatch => ({
 
});

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1
    },
    slide2: {
      
    },
    slide3: {
      
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail)