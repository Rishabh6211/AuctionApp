import { Request } from '../../utilities/'
import * as types from '../../actionTypes'
import { Server_Url } from '../../constant'
import {toast} from '../../utilities'

export const login = (auth, body, cb) => {
    console.log('vody----',body)
    return async dispatch => {
        try {
            dispatch({ type: types.LOGIN_REQUEST })
            const response = await Request({
                url: `${Server_Url}login`,
                method: 'POST',
                auth,
                body: body
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
                dispatch({type: types.LOGIN_SUCCESS, payload: response.data})
                cb(response.data)
               
            } else {
                toast({
                    text:response.message,
                    type:'danger'
                })
                dispatch({ type: types.LOGIN_FAIL })
               
                cb(null)
            }
        } catch (err) {
            dispatch({ type: types.LOGIN_FAIL })
            console.log("err1", err)
            
            cb(null)
        }
    }

}

export const SignUp = (auth, body, cb) => {
    console.log('vody----',body)
    return async dispatch => {
        try {
            dispatch({ type: types.SIGNUP_REQUEST })
            const response = await Request({
                url: `${Server_Url}register`,
                method: 'POST',
                auth,
                body: body
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
                dispatch({type: types.SIGNUP_FAIL, payload: response.data})
                cb(response.data)
               
            } else {
                dispatch({ type: types.SIGNUP_FAIL })
                toast({
                    text:response.message,
                    type:'danger'
                })
                cb(null)
            }
        } catch (err) {
            dispatch({ type: types.SIGNUP_FAIL })
            console.log("err1", err)
            
            cb(null)
        }
    }

}

export const verify = (auth, body, cb) => {
    console.log('vody----',body)
    return async dispatch => {
        try {
            dispatch({ type: types.VERIFICATION_REQUEST })
            const response = await Request({
                url: `${Server_Url}verify`,
                method: 'POST',
                auth,
                body: body
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
                dispatch({type: types.VERIFICATION_SUCCESS, payload: response.data})
                toast({
                    text:response.message,
                    type:'success'
                })
                cb(true)
               
            } else {
                dispatch({ type: types.VERIFICATION_FAIL })
                toast({
                    text:response.message,
                    type:'danger'
                })
                cb(false)
            }
        } catch (err) {
            dispatch({ type: types.VERIFICATION_FAIL })
            console.log("err1", err)
            
            cb(false)
        }
    }

}

export const forgotPassword = (auth, body, cb) => {
    console.log('vody----',body)
    return async dispatch => {
        try {
            
            const response = await Request({
                url: `${Server_Url}forgotpassword`,
                method: 'POST',
                auth,
                body: body
            })
            console.log('forgot', response)
            if (response.responseCode === 200) {
                toast({
                    text:response.message,
                    type:'success'
                })
                cb(true)
               
            } else {
               
                toast({
                    text:response.message,
                    type:'danger'
                })
                cb(false)
            }
        } catch (err) {
           
            console.log("err1", err)
            
            cb(false)
        }
    }

}

export const verificationOtp = (auth, body, cb) => {
    console.log('vody----',body)
    return async dispatch => {
        try {
            
            const response = await Request({
                url: `${Server_Url}verifyOtp`,
                method: 'POST',
                auth,
                body: body
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
              
                toast({
                    text:response.message,
                    type:'success'
                })
                cb(true)
               
            } else {
               
                cb(false)
            }
        } catch (err) {
            console.log("err1", err)
            
            cb(false)
        }
    }

}

export const resetPassword = (auth, body, cb) => {
    console.log('vody----',body)
    return async dispatch => {
        try {
            
            const response = await Request({
                url: `${Server_Url}resetpassword`,
                method: 'PUT',
                auth,
                body: body
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
              
                toast({
                    text:response.message,
                    type:'success'
                })
                cb(true)
               
            } else {
               
                cb(false)
            }
        } catch (err) {
            console.log("err1", err)
            
            cb(false)
        }
    }

}