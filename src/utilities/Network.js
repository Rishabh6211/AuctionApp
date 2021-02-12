
import NetInfo from "@react-native-community/netinfo";

export const network = ()=>{

  NetInfo.addEventListener(state => {
   if(state.isConnected === 'none'){
    alert("No internet connection")
   } 
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });

  
    // NetInfo.fetch().then((connectionInfo) => {
    //     console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: '    + connectionInfo.NetInfoStateType);
    //       if(connectionInfo.type === 'none'){
    //        alert("No internet connection")
    //       }
    //       if(connectionInfo.NetInfoStateType === '2g' || connectionInfo.NetInfoStateType === 'Edge'){
    //         alert("Slow internet connection")
    //       }
      
    //   });
    //   function handleFirstConnectivityChange(connectionInfo) {
    //     console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.NetInfoStateType);
        
    //     NetInfo.removeEventListener(
    //       'connectionChange',
    //       handleFirstConnectivityChange
    //     );
    //   }
    //   NetInfo.addEventListener(
    //     'connectionChange',
    //     handleFirstConnectivityChange
    //   );

}