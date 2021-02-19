import { Alert, Linking} from "react-native";


export function truncateStr(_str, _idx, isDot = true) {
    if (_str.length > _idx) {
      if (isDot) {
        return _str.substring(0, _idx) + "...";
      } else {
        return _str.substring(0, _idx) + " *** ****";
      }
    } else {
      return _str;
    }
  }

 export function redirectToSettings(_msg) {

    Alert.alert(
     "Auction App",
      "Please allow permission from settings.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Ok", onPress: () => {
            Linking.openSettings();
          }
        }
      ],
      { cancelable: false }
    );
  
  }
  