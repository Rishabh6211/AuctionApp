import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { DesignedButton, DesignedTextInput,UpdatedHeader } from '../../components/'
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {emptyEmail,emailReg,invalidEmail,Colors} from '../../constant'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import { logo , backarrow} from '../../assets/'
import { Avatar } from 'react-native-paper';
import Icons from 'react-native-vector-icons/FontAwesome' 

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
     phoneError: false,
     userName:'',
     email:'',
     phone:'',
     address:'',
     edit:false
    }
  }

  componentDidMount(){
    this.setState({phone:this.props.loginData.phone,userName:this.props.loginData.name,email:this.props.loginData.email,address:this.props.loginData.address})
  }

  submit = () => {
    
  }

  errorView = type => {
    return (
      <View style={{ paddingTop: 2, }}>
        <Text style={styles.errorTexts}>
          {type === "email" && this.state.invalidEmailAddress ? invalidEmail : type === "email" ? emptyEmail : ''}
        </Text>
      </View>
    );
  };

  render() {
    return (
      
        <KeyboardAwareScrollView style={{ height:height }} >
      
      
        <View style={{height:height*0.1}}>
        <UpdatedHeader
            leftIcon={true}
            leftPress={()=>Actions.pop()}
            headerText={'Profile'}
        />
           </View>
         
           <View style={{height:height*0.1,flexDirection:'row'}}>
               <View style={{flex:0.8}}/>
               <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=> this.setState({edit:true})}><Icons name="edit" size={35} /></TouchableOpacity>
                </View>
            </View>
         
           <View style={{flex:0.3,justifyContent:'center',alignItems:'center'}}>
           <Avatar.Image size={150} source={{uri:'https://mpng.subpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg'}} />
            
         </View>
        
            <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}}>
                <DesignedTextInput label="Username" value={this.state.userName} onChangeText={(value)=>this.setState({userName:value})} editable={this.state.edit} />
            </View>
            <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}} >
                <DesignedTextInput label="Email" value={this.state.email} onChangeText={(value)=>this.setState({email:value})} editable={this.state.edit} />
            </View>
            <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}}>
                <DesignedTextInput label="Phone" value={this.state.phone} editable={false}/>
            </View>
            <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}}>
                <DesignedTextInput label="Address" value={this.state.address} onChangeText={(value)=>this.setState({address:value})} editable={this.state.edit} />
            </View>
          {this.state.edit?  <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}}>
                <DesignedButton  buttonText="Submit" style={{height:40,justifyContent:'center',alignItems:'center',width:'40%'}}/>
              </View>:null}
            </KeyboardAwareScrollView>
       
  
     
    );
  }
}

const mapStateToProps = state => {
  return {
    loginData : state.loginReducer.data?state.loginReducer.data:{},
  };
};
const mapDispatchToProps = dispatch => ({

});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  },
  bottomTextContainer: {
    height: height * 0.15
  },
  buttonView: {
    height: height * 0.10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    // flexDirection: "row"
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)