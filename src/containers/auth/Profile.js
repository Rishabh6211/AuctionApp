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
import { DesignedButton, DesignedTextInput,Loader,UpdatedHeader } from '../../components/'
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {emptyEmail,emailReg,invalidEmail,Colors,Server_Url} from '../../constant'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import { logo , backarrow} from '../../assets/'
import { Avatar } from 'react-native-paper';
import Icons from 'react-native-vector-icons/FontAwesome' 
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker';
import {redirectToSettings} from  '../../helpers/'
import * as AppActions from '../../actions'


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
     edit:false,
     profileImageData: '',
     userProfile:'',
     loading:false,
     image:false
    }
  }

  componentDidMount(){
    this.setState({phone:this.props.loginData.phone,userName:this.props.loginData.name,email:this.props.loginData.email,address:this.props.loginData.address})
  }

  submit = () => {
    
  }

  

  editProfile = () => {
    let auth = {}
    let body = {
      userId:this.props.loginData._id,
      name:this.state.userName?this.state.userName:this.props.loginData.name,
      email:this.state.email?this.state.email:this.props.loginData.email,
      address:this.state.address?this.state.address:this.props.loginData.address
    }
    this.setState({loading:true})
    this.props.uploadUser(auth,body,(data)=>{
      this.setState({loading:false})
      if(data){
        Actions.home()
      }
     
    })
  }


  onActionSheetPress = (index) => {
    //this.ActionSheet.show()
    if (index == 0) return;
    let value = index == 1 ? true : false;
    this.imagePicker(value)
  }

  uploadImage = () => {
    this.ActionSheet.show();
  }

  imagePicker = (camera) => {
    if (camera == true) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        useFrontCamera: true,
        cropping: true,
        includeBase64: true
      }).then(image => {

        const profile_pic = {
          name: image.path.split("/").pop(),
          type: image.mime,
          uri: image.path,
        };
      

        this.setState({
          userProfile: profile_pic,
          profileImageData: "data:" + image.mime + ";base64," + image.data
        });

       
        let auth ={}
        var formdata = new FormData();
        formdata.append("userId", this.props.loginData._id);
        formdata.append("image", profile_pic);

        var requestOptions = {
          method: 'PUT',
          body: formdata,
          redirect: 'follow'
        };

        console.log('request---',requestOptions)
        this.setState({loading:true})
        fetch("https://auctionnode.herokuapp.com/image", requestOptions)
          .then(response => response.text())
          .then(result => this.setState({loading:false}))
          .catch(error => this.setState({loading:false}));

        // formData.append("image", profile_pic);
        // formData.append("userId", this.props.loginData._id);
        // this.setState({loading:true})
        // this.props.uploadImageData(auth,formData,(data)=>{
        //   this.setState({loading:false})
        //   alert('success')
        // }).catch((err)=> this.setState({loading:false}))

      }).catch((err) => {
        if (err == "Error: Required permission missing") {
          redirectToSettings()
        }
      });
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
      }).then(image => {
        const profile_pic = {
          name: image.path.split("/").pop(),
          type: image.mime,
          uri: image.path,
        };
        this.setState({
          userProfile: profile_pic,
          profileImageData: "data:" + image.mime + ";base64," + image.data
        })
        console.log("data:" + image.mime + ";base64,")
      }).catch((err) => {
        if (err == "Error: Required permission missing") {
          redirectToSettings()
        }
        console.log("rad", err)
      });
    }
  };

  render() {
    const options = [
      <Text style={{ color: Colors.lightGray, fontSize: RFValue(16), fontWeight: "bold" }}>{"CANCEL"}</Text>,
      <Text style={{ color: Colors.lightGray, fontWeight: "bold" }}>{"OPEN CAMERA"}</Text>,
      <Text style={{ color: Colors.lightGray, fontWeight: "bold" }}>{"OPEN GALLERY"}</Text>,
    ]

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
           <TouchableOpacity onPress={()=>{this.uploadImage(); this.setState({image:true})}}><Avatar.Image size={150} source={{uri:this.state.profileImageData?this.state.profileImageData:`${Server_Url}images/user/${this.props.loginData.image}`}} /></TouchableOpacity>
            
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
                <DesignedButton  buttonText="Submit" style={{height:40,justifyContent:'center',alignItems:'center',width:'40%'}} onPress={()=>this.editProfile()}/>
              </View>:null}

              <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={0}
          onPress={(index) => { this.onActionSheetPress(index); }}
        />
        <Loader loading={this.state.loading}/>
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
  uploadImageData :(auth,body,cb) => dispatch(AppActions.uploadImage(auth,body,cb)),
  uploadUser:(auth,body,cb)=>dispatch(AppActions.updateUser(auth,body,cb))
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