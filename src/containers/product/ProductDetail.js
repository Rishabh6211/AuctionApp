import React, {Component, useDebugValue} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  Keyboard,
  TextInput,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  UpdatedHeader,
  DesignedTextInput,
  DesignedButton,
  Loader,
} from '../../components';
import {connect} from 'react-redux';
import {sidebar} from '../../assets1';
import {Colors, Server_Url} from '../../constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome5';
import * as AppAction from '../../actions/';
import {truncateStr} from '../../helpers/';
import Swiper from 'react-native-swiper';
import {Card, Title, Paragraph} from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ficons from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: [],
      fixedCost: [],
      placeBid: false,
      amount: '',
      loading: false,
      text: '',
      commentModal: false,
      loginUser: false,
      editProduct: false,
      title: '',
      bidDuration: '',
      bidIncerement: '',
      bidprice: '',
      fPrie: '',
      sPrice: '',
      description: '',
      contact: '',
      address: '',
    };
  }

  componentDidMount() {
    console.log('props---', this.props);
    console.log(
      'loginId',
      this.props.loginData._id,
      this.props.productData.userId,
    );
    if (this.props.loginData._id === this.props.productData.userId) {
      this.setState({loginUser: true});
    }

    this.setState({
      title: this.props.productData.title,
      address: this.props.productData.address,
      contact: this.props.productData.contactLister,
      sPrice: this.props.productData.startingPrice,
      fPrie: this.props.productData.fixedPrice,
      description: this.props.productData.description,
    });
  }

  renderPage(index) {
    return (
      <View style={styles.slide1}>
        <Image
          style={{height: '100%', width: '100%'}}
          resizeMode="stretch"
          source={{
            uri: `${Server_Url}/images/Products/${this.props.productData.image[index]}`,
          }}
        />
      </View>
    );
  }

  renderComment(item) {
    return (
      <View>
        {item.type == 'bid' ? (
          <View
            style={{
              height: height * 0.11,
              marginHorizontal: moderateScale(10),
              marginVertical: 10,
            }}>
            <Card style={{backgroundColor: Colors.RedicalRed}}>
              <Card.Content>
                <Text style={{fontSize: 18}}>{item.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icons
                    name="hand-holding-usd"
                    size={20}
                    style={{marginTop: 3}}
                    color={Colors.Black}
                  />
                  <Text style={{marginLeft: 10, marginTop: 5}}>
                    {item.text}$
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        ) : (
          <View
            style={{
              height: height * 0.11,
              marginHorizontal: moderateScale(10),
              marginVertical: 10,
            }}>
            <Card style={{backgroundColor: Colors.silverWhite}}>
              <Card.Content>
                <Text style={{fontSize: 18}}>{item.name}</Text>

                <Text style={{marginLeft: 10, marginTop: 5}}>{item.text}</Text>
              </Card.Content>
            </Card>
          </View>
        )}
      </View>
    );
  }

  onEdit = () => {
    const {title, address, contact, sPrice, fPrie, description} = this.state;

    let body = {
      title: title ? title : this.props.productData.title,
      address: address ? address : this.props.productData.address,
      contact: contact ? contact : this.props.productData.contactLister,
      sPrice: sPrice ? sPrice : this.props.productData.startingPrice,
      fPrie: fPrie ? fPrie : this.props.productData.fixedPrice,
      description: description
        ? description
        : this.props.productData.description,
      categoryName: this.props.productData.categoryName,
      userId: this.props.productData.userId,
      auctionChoice: this.props.productData.auctionChoice,
      bidIncerement: this.props.productData.bidIncerement,
      bidDuration: this.props.productData.bidDuration,
      productId : this.props.productData._id
    }

    let productId = this.props.productData._id

    console.log('body--',body)

    this.setState({loading:true})

    this.props
        .editProduct(body, (data) => {
          if(data){
            this.props
            .productDetail(productId, (response) => {
              this.setState({loading: false});
              console.log('data---', response);
              this.setState({editProduct: false});
            })
            .catch((err) => this.setState({loading: false}));
          }
         
        })
        .catch((err) => this.setState({loading: false}));
  };

  onSubmit = () => {
    let startingPrice = parseInt(this.props.productData.startingPrice);
    let bidIncerement = parseInt(this.props.productData.bidIncerement);
    let total = startingPrice + bidIncerement;
    console.log('total---', total);
    let bidprice = this.state.amount;

    if (bidprice < total) {
      alert(`Bid Price must be higher then ${total}$`);
    } else {
      let body = {
        productId: this.props.productData._id,
        comment: this.state.amount,
        name: this.props.loginData.username,
        userId: this.props.loginData._id,
        type: 'bid',
      };

      this.setState({loading: true});
      this.props
        .comment(body, (data) => {
          this.props
            .productDetail(body.productId, (response) => {
              this.setState({loading: false});
              console.log('data---', response);
              this.setState({placeBid: false});
            })
            .catch((err) => this.setState({loading: false}));
        })
        .catch((err) => this.setState({loading: false}));
    }
  };

  onComment = () => {
    if (this.state.text) {
      let body = {
        productId: this.props.productData._id,
        comment: this.state.text,
        name: this.props.loginData.username,
        userId: this.props.loginData._id,
        type: 'comment',
      };

      this.setState({loading: true});
      this.props
        .comment(body, (data) => {
          this.props
            .productDetail(body.productId, (response) => {
              this.setState({loading: false});
              console.log('data---', response);
              this.setState({placeBid: false, commentModal: false});
            })
            .catch((err) => this.setState({loading: false}));
        })
        .catch((err) => this.setState({loading: false}));
    } else {
      alert('Please enter comment');
    }
  };

  ModalComponent = () => (
    <View style={{height: height * 1.3, marginHorizontal: moderateScale(10)}}>
      <View style={styles.textInputStyle}>
        <DesignedTextInput
          styleGlobal={{width: '100%'}}
          label="Title of product"
          value={this.state.title}
          onChangeText={(text) => this.setState({title: text})}
        />
      </View>

      <View style={styles.textInputStyle}>
        <DesignedTextInput
          styleGlobal={{width: '100%'}}
          label="Address"
          value={this.state.address}
          onChangeText={(text) => this.setState({address: text})}
        />
      </View>

      <View style={styles.textInputStyle}>
        <DesignedTextInput
          styleGlobal={{width: '100%'}}
          label="Contact"
          value={this.state.contact}
          onChangeText={(text) => this.setState({contact: text})}
        />
      </View>
      <View style={{height: height * 0.02}} />

      {/* <View style={{...styles.textInputStyle, flexDirection:'row'}}>
         <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
       <DesignedTextInput 
         styleGlobal={{width:'100%'}}
       label="Bid increment"
       value={this.state.bidIncrement}
       keyboardType={'numeric'}
       onChangeText={(text)=>this.setState({bidIncrement:text})}
       />
       </View>
       <View style={{flex:0.5,marginHorizontal:moderateScale(5)}}>
       <DesignedTextInput 
         styleGlobal={{width:'100%'}}
       
       label="Bid Duration"
       value={this.state.bidDuration}
       keyboardType={'numeric'}
       onChangeText={(text)=>this.setState({bidDuration:text})}
       />
       </View>
       </View> */}
      <View style={{...styles.textInputStyle, flexDirection: 'row'}}>
        <View style={{flex: 0.5, marginHorizontal: moderateScale(5)}}>
          <DesignedTextInput
            styleGlobal={{width: '100%'}}
            label="Starting Price"
            disabled={
              this.props.productData.auctionChoice == 'Auction' ? false : true
            }
            value={this.state.sPrice}
            keyboardType={'numeric'}
            onChangeText={(text) => this.setState({sPrice: text})}
          />
        </View>

        <View style={{flex: 0.5, marginHorizontal: moderateScale(5)}}>
          <DesignedTextInput
            styleGlobal={{width: '100%'}}
            disabled={
              this.props.productData.auctionChoice == 'Auction' ? true : false
            }
            label="Fix price"
            value={this.state.fPrie}
            keyboardType={'numeric'}
            onChangeText={(text) => this.setState({fPrie: text})}
          />
        </View>
      </View>

      <View style={styles.textAreaView}>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            // underlineColorAndroid="transparent"
            placeholder="Description"
            placeholderTextColor={Colors.Gray}
            numberOfLines={10}
            multiline={true}
            returnKeyType="done"
            maxLength={200}
            value={this.state.description}
            onChangeText={(value) => this.setState({description: value})}
          />
        </View>
      </View>
      <View style={{flex: 0.1}} />

      <View
        style={{
          height: height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <DesignedButton buttonText="Edit Product" onPress={() => this.onEdit()} />
      </View>
    </View>
  );

  render() {
    console.log('props---', this.state);
    const productImage = this.props.productData.image.map((it, idx) => {
      return this.renderPage(idx);
    });

    const comments = this.props.productData.comment.map((item, index) => {
      return this.renderComment(item);
    });
    return (
      <View style={{height: height}}>
        <View style={{height: height * 0.1}}>
          <UpdatedHeader
            leftIcon={true}
            leftPress={() => Actions.pop()}
            headerText={this.props.productData.title}
          />
        </View>
        <ScrollView>
          <View style={{flex: 0.01}} />

          <View style={{height: height * 0.35}}>
            <Swiper style={styles.wrapper}>{productImage}</Swiper>
          </View>
          <View style={{height: height * 0.01}} />
          {this.state.loginUser ? (
            <View
              style={{
                height: height * 0.05,
                marginHorizontal: moderateScale(20),
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({editProduct: true})}>
                <Icons name="edit" size={25} />
              </TouchableOpacity>
            </View>
          ) : null}
          {this.props.productData.auctionChoice == 'Auction' ? (
            <View style={{height: height * 0.1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.5,
                  alignItems: 'flex-start',
                  marginHorizontal: moderateScale(10),
                }}>
                <CountDown until={1000} size={20} />
              </View>
              <View style={{flex: 0.1}} />
              <View style={{flex: 0.3}}>
                <View style={{flex: 0.1}} />
                <TouchableOpacity
                  style={{
                    flex: 0.7,
                    backgroundColor: Colors.RedicalRed,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(10),
                  }}
                  onPress={() => this.setState({placeBid: true})}>
                  <Text>Place Bid</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <View style={{height: height * 0.01}} />

          <View style={{height: height * 0.15, marginHorizontal: 10,flexDirection:'row'}}>
            <View style={{flex:0.2}}>
              </View>
            <View style={{flex:0.8}}>
            <Card style={{backgroundColor: Colors.silverWhite}}>
              <Card.Content>
                <Title>{this.props.sellerData.name}</Title>
                <Paragraph>{this.props.sellerData.address}</Paragraph>
              </Card.Content>
            </Card>
            </View>
          </View>

          <View style={{height: height * 0.15, marginHorizontal: 10}}>
            <Card style={{backgroundColor: Colors.silverWhite}}>
              <Card.Content>
                <Title>{this.props.productData.title}</Title>
                <Paragraph>{this.props.productData.description}</Paragraph>
              </Card.Content>
            </Card>
          </View>

          <View style={{height: height * 0.15, flexDirection: 'row'}}>
            <View style={{flex: 0.5, marginHorizontal: moderateScale(10)}}>
              <Card style={{backgroundColor: Colors.silverWhite}}>
                <Card.Content>
                  <Title>Product Type</Title>
                  <Paragraph>{this.props.productData.auctionChoice}</Paragraph>
                </Card.Content>
              </Card>
            </View>

            <View style={{flex: 0.5, marginHorizontal: moderateScale(10)}}>
              <Card style={{backgroundColor: Colors.silverWhite}}>
                <Card.Content>
                  <Title>Category</Title>
                  <Paragraph>{this.props.productData.categoryName}</Paragraph>
                </Card.Content>
              </Card>
            </View>
          </View>
          <View style={{height: height * 0.15, marginHorizontal: 10}}>
            <Card style={{backgroundColor: Colors.silverWhite}}>
              <Card.Content>
                <Paragraph>
                  Address : {this.props.productData.address}
                </Paragraph>
                <Paragraph>
                  Price : {this.props.productData.startingPrice}$
                </Paragraph>
                <Paragraph>
                  Bid Increment : {this.props.productData.bidIncerement}$
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
          <View
            style={{
              height: height * 0.1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginHorizontal: moderateScale(10),
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Contact on</Text>
          </View>
          <View
            style={{
              height: height * 0.1,
              justifyContent: 'flex-start',
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
            }}>
            <Icon name="telegram" size={35} color="#0088cc" />
            <Icon
              name="whatsapp"
              size={40}
              color="#4FCE5D"
              style={{marginLeft: 10}}
            />
          </View>
          <View
            style={{
              height: height * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <DesignedTextInput
              placeholder="Comment"
              mode="outlined"
              onFocus={() => {
                Keyboard.dismiss();
                this.setState({commentModal: true});
              }}
            />
          </View>
          <View style={{height: height * 0.05}} />

          {this.props.productData.comment.length > 0 ? comments : null}
          {this.props.productData.comment.length > 0 ? (
            <View style={{height: height * 0.05}} />
          ) : null}
        </ScrollView>
        <Modal
          visible={this.state.placeBid}
          animationType="slide"
          transparent={true}>
          <View style={{flex: 1}}>
            <View
              style={{flex: 0.5, backgroundColor: Colors.transParentColor}}
            />
            <View style={{flex: 0.5, backgroundColor: Colors.White}}>
              <View style={{flex: 0.05}} />
              <View style={{flex: 0.1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 0.9,
                    justifyContent: 'center',
                    marginHorizontal: moderateScale(20),
                  }}>
                  <Text style={{fontSize: 22}}>Place Bid</Text>
                </View>
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: 'center',
                    marginHorizontal: moderateScale(10),
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({placeBid: false})}>
                    <Ficons name="cross" size={35} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex: 0.1}} />
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <DesignedTextInput
                  label="Amount"
                  keyboardType={'numeric'}
                  value={this.state.amount}
                  onChangeText={(text) => this.setState({amount: text})}
                />
              </View>
              <View style={{flex: 0.2}} />
              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <DesignedButton
                  buttonText="Place Bid"
                  onPress={() => this.onSubmit()}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal for comment */}
        <Modal
          visible={this.state.commentModal}
          animationType="slide"
          transparent={true}>
          <View style={{flex: 1}}>
            <View
              style={{flex: 0.4, backgroundColor: Colors.transParentColor}}
            />
            <View style={{flex: 0.6, backgroundColor: Colors.White}}>
              <View style={{flex: 0.1}} />
              <View style={{flex: 0.1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 0.9,
                    justifyContent: 'center',
                    marginHorizontal: moderateScale(20),
                  }}>
                  <Text style={{fontSize: 22}}>Add Comment</Text>
                </View>
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: 'center',
                    marginHorizontal: moderateScale(10),
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({commentModal: false})}>
                    <Ficons name="cross" size={35} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex: 0.3}} />
              <View style={{flex: 0.15, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <DesignedTextInput
                    label="Comment"
                    mode="outlined"
                    value={this.state.text}
                    onChangeText={(value) => this.setState({text: value})}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.RedicalRed,
                    borderRadius: moderateScale(20),
                    marginHorizontal: 5,
                  }}
                  onPress={() => this.onComment()}>
                  <Ionicons name="send" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Edit product */}

        <Modal
          visible={this.state.editProduct}
          style={{height: height, backgroundColor: Colors.White}}
          animationType="slide">
          <View style={{height: height * 0.1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 0.9,
                justifyContent: 'center',
                marginHorizontal: moderateScale(20),
              }}>
              <Text style={{fontSize: 24}}>Edit Product</Text>
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                marginHorizontal: moderateScale(10),
              }}>
              <TouchableOpacity
                onPress={() => this.setState({editProduct: false})}>
                <Ficons name="cross" size={35} />
              </TouchableOpacity>
            </View>
          </View>
          <KeyboardAwareScrollView>
            {this.ModalComponent()}
          </KeyboardAwareScrollView>
        </Modal>

        <Loader loading={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state----', state);
  return {
    productData: state.productReducer.productData.data
      ? state.productReducer.productData.data
      : {},
      sellerData: state.productReducer.productData.userInfo
      ? state.productReducer.productData.userInfo
      : {},
    loginData: state.loginReducer.data ? state.loginReducer.data : {},
  };
};
const mapDispatchToProps = (dispatch) => ({
  comment: (body, cb) => dispatch(AppAction.productComment(body, cb)),
  productDetail: (id, cb) => dispatch(AppAction.productDetail(id, cb)),
  editProduct:(body,cb) => dispatch(AppAction.editProduct(body,cb))
});

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
  },
  slide2: {},
  slide3: {},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textAreaContainer: {
    borderColor: Colors.boderGray,
    borderWidth: 1,
    borderRadius: moderateScale(5),
    padding: 5,
  },
  textArea: {
    height: height * 0.2,
    textAlignVertical: 'top',
    fontSize: RFValue(16),
    color: Colors.DimGrayText,
  },
  textAreaView: {
    height: height * 0.2,
    // marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(15),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
