import { Dimensions } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
const { height } = Dimensions.get('window');
import { Colors } from '.';
import { RFValue } from "react-native-responsive-fontsize";
import { Platform } from 'react-native';
export const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  headerview: {
    height: height * 0.15,
  },
  gradientView: {
    height: height * 0.07,
  },
  textInputView: {
    height: height * 0.10,
  },
  commonView: {
    flex: 1,
    flexDirection: 'row',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: Colors.homeHeaderColor
  },
  hederWithElvation: {
    borderBottomStartRadius: 1,
    borderBottomRightRadius: 1,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 2,
  },
  iconView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: RFValue(20),
    color: Colors.Black,
  },
  errorTexts: {
    color: Colors.Tomatored,
    fontSize: RFValue(13)
  },
  inputPadding: {
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  justifySpaceBetween: {
    justifyContent: "space-between"
  },
  justifyContentSpaceBetween: {
    justifyContent: "space-between"
  },
  pd10: {
    padding: 10
  },
  pdTop20: {
    paddingTop: 20,
  },
  pdBottom20: {
    paddingBottom: 20,
  },
  pdRight20: {
    paddingRight: 20,
  },
  pdLeft20: {
    paddingLeft: 20,
  },
  width70: {
    width: 70,
  },
  width80_: {
    width: 80,
  },
  height70: {
    height: 70
  },
  fs10: {
    fontSize: RFValue(10)
  },
  fs11: {
    fontSize: RFValue(11)
  },
  fs12: {
    fontSize: RFValue(12)
  },
  fs14: {
    fontSize: RFValue(14)
  },
  fs16: {
    fontSize: RFValue(16)
  },
  fs18: {
    fontSize: RFValue(18)
  },
  fs19: {
    fontSize: RFValue(19)
  },
  fs20: {
    fontSize: RFValue(20)
  },
  fs22: {
    fontSize: RFValue(22)
  },
  fs26: {
    fontSize: RFValue(26)
  },
  FFRobotoMedium: {
    fontFamily: "Roboto-Medium",
  },
  FFRobotoRegular: {
    fontFamily: "Roboto-Regular",
  },
  FFRobotoBold: {
    fontFamily: "Roboto-Bold",
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  alignContentCenter: {
    alignContent: "center"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  textAlignLeft: {
    textAlign: "left"
  },
  fontWeightBold: {
    fontWeight: "bold"
  },
  m5: {
    margin: moderateScale(5)
  },
  m10: {
    margin: moderateScale(10)
  },
  mT5: {
    marginTop: moderateScale(5)
  },
  mLeft5: {
    marginLeft: moderateScale(5)
  },
  mRight5: {
    marginRight: moderateScale(5)
  },
  mTop20: {
    marginTop: moderateScale(20)
  },
  mTop10: {
    marginTop: moderateScale(10)
  },
  mBottom20: {
    marginBottom: moderateScale(20)
  },
  mBottom10: {
    marginBottom: moderateScale(10)
  },
  mLeft20: {
    marginLeft: moderateScale(20)
  },
  mLeft30: {
    marginLeft: moderateScale(30)
  },
  mRight20: {
    marginRight: moderateScale(20)
  },
  mLeft10: {
    marginLeft: moderateScale(10)
  },
  mRight10: {
    marginRight: moderateScale(10)
  },
  flexDirectionRow: {
    flexDirection: "row"
  },
  width40: {
    width: moderateScale(40)
  },
  height40: {
    height: moderateScale(40)
  },
  width30: {
    width: moderateScale(30)
  },
  height30: {
    height: moderateScale(30)
  },
  width20: {
    width: moderateScale(20)
  },
  height20: {
    height: moderateScale(20)
  },
  width15: {
    width: moderateScale(15)
  },
  height15: {
    height: moderateScale(15)
  },
  height1: {
    height: moderateScale(1)
  },
  marginRight10: {
    marginRight: moderateScale(10)
  },
  baseContent1: {
    marginTop: "5%"
  },
  width100: {
    width: "100%"
  },
  width80: {
    width: "80%"
  },
  height100: {
    height: "100%"
  },
  width90: {
    width: "90%"
  },
  height90: {
    height: "90%"
  },
  positionAbolute: {
    position: "absolute"
  },
  right20: {
    right: moderateScale(20)
  },
  left20: {
    left: moderateScale(20)
  },
  alignSelfCenter: {
    alignSelf: "center"
  },

  dropDownModal: {
    flex: 1,
    backgroundColor: Colors.transParentColor,
  },
  ModalText: {
    fontSize: RFValue(16),
    color: Colors.Darkgraish,
    marginHorizontal: moderateScale(20),
    margin: 5
  },
  HeadingText: {
    fontFamily: "Roboto-Medium",
    fontSize: RFValue(14),
    color: Colors.Darkgraish
  },
  platformBasedHeader: {
    height: Platform.OS === 'ios' ? 50 : 0
  }

});
