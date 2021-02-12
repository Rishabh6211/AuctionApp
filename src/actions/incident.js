import {Request} from '../utilities/'
import * as types from '../actionTypes/'
// import { Toast } from 'native-base';

export const incident = (body) => (dispatch) =>{
    console.log("body-----",body)
    // dispatch({type:types.INCIDENT_FORM_SUCCESS , payload:body})
    // Toast.show({
    //     text: 'Successfully submit',
    //     buttonText: 'Okay',
    //     type:'success'
    //   })
//  try {
//     return async (dispatch) => {
//       dispatch({ type: types.CHANGE_REQUEST });
//       const response = await Request({
//         url: `${SERVER_URL}/api/v1/user/password`,
//         auth,
//         body,
//         method: "PUT"
//       });

//       if (response.statusCode === 200) {
//         goHome()
//         toast({ text: response.message, backgroundColor: color.success })
//         return dispatch({ type: types.CHANGE_SUCCESS });
//       }
//       else {
//         toast({ text: response.message, backgroundColor: color.danger })
//         dispatch({ type: types.CHANGE_FAIL });
//       }
//     };
//   } catch (error) {
//     toast({ text: response.message, backgroundColor: color.danger })
//     dispatch({ type: types.CHANGE_FAIL });
//   }
     }
   