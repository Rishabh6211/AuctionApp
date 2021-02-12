import * as types from '../../actionTypes'

const INITIAL_STATE = {
    loading: false,
    data: '',
}

export default function loginData(state = INITIAL_STATE, action) { // reducres are create to get active user
   
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
               
            }
            break;
        
        case types.LOGIN_SUCCESS:
           
            return {
                ...state,
                data: action.payload,
               
                loading: false,
               
            }
            break;
        case types.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                
            }
        }
    return state;
}