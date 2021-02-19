import { Request } from '../../utilities/'
import * as types from '../../actionTypes'
import { Server_Url } from '../../constant'
import {toast} from '../../utilities'
import { Actions } from "react-native-router-flux";


export const getAllProduct = (cb) => {
    
    return async dispatch => {
        try {
            dispatch({ type: types.GET_PRODUCT_REQUEST })
            const response = await Request({
                url: `${Server_Url}allProduct`,
                method: 'GET',
              
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
                dispatch({type: types.GET_PRODUCT_SUCCESS, payload: response.data})
                cb(response.data)
               
            } else {
                dispatch({ type: types.GET_PRODUCT_FAIL })
              
                cb(null)
            }
        } catch (err) {
            dispatch({ type: types.GET_PRODUCT_FAIL })
            console.log("err1", err)
            
            cb(null)
        }
    }

}

export const getAllCategory = () => {
    
    return async dispatch => {
        try {
            dispatch({ type: types.GET_CATEGORY_REQUEST })
            const response = await Request({
                url: `${Server_Url}category`,
                method: 'GET',
              
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
                dispatch({type: types.GET_CATEGORY_SUCCESS, payload: response.data})
               
               
            } else {
                dispatch({ type: types.GET_CATEGORY_FAIL })
              
               
            }
        } catch (err) {
            dispatch({ type: types.GET_CATEGORY_FAIL })
            console.log("err1", err)
            
           
        }
    }

}

export const myListing = (id) => {
    
    return async dispatch => {
        try {
            dispatch({ type: types.MY_LISTING_REQUEST })
            const response = await Request({
                url: `${Server_Url}userProduct/${id}`,
                method: 'GET',
              
            })
            console.log('datatata login login login logins', response)
            if (response.responseCode === 200) {
                dispatch({type: types.MY_LISTING_SUCCESS, payload: response.data})
                console.log('heree---')
               Actions.product()
               
            } else {
                dispatch({ type: types.MY_LISTING_FAIL })
            }
        } catch (err) {
            dispatch({ type: types.MY_LISTING_FAIL })
            console.log("err1", err)
            
           
        }
    }

}

export const categoryByProduct = (auth,body) => {
    console.log('body---',body)
    return async dispatch => {
        try {
            dispatch({ type: types.MY_LISTING_REQUEST })
            const response = await Request({
                url: `${Server_Url}productsByCategory`,
                method: 'POST',
                body
              
            })
            console.log('products', response)
            if (response.responseCode === 200) {
                dispatch({type: types.MY_LISTING_SUCCESS, payload: response.data})

               Actions.product()
               
            } else {
                dispatch({ type: types.MY_LISTING_FAIL })
            }
        } catch (err) {
            dispatch({ type: types.MY_LISTING_FAIL })
            console.log("err1", err)
            
           
        }
    }

}

export const productDetail = (id,cb) => {
    return async dispatch => {
        try {
            dispatch({ type: types.PRODUCT_DATA_REQUEST })
            const response = await Request({
                url: `${Server_Url}productDetails/${id}`,
                method: 'GET',
              
            })
            console.log('products', response)
            if (response.responseCode === 200) {
                dispatch({type: types.PRODUCT_DATA_SUCCESS, payload: response.data})

                    cb(response.data)
               
            } else {
                dispatch({ type: types.PRODUCT_DATA_FAIL })
                cb(null)
            }
        } catch (err) {
            dispatch({ type: types.PRODUCT_DATA_FAIL })
            console.log("err1", err)
            cb(null)
           
        }
}
}

export const productComment = (body,cb) => {
    return async dispatch => {
        try {
            // dispatch({ type: types.PRODUCT_DATA_REQUEST })
            const response = await Request({
                url: `${Server_Url}comment`,
                method: 'POST',
                body
              
            })
            console.log('products', response)
            if (response.responseCode === 200) {
                // dispatch({type: types.PRODUCT_DATA_SUCCESS, payload: response.data})

                    cb(response.data)
               
            } else {
                // dispatch({ type: types.PRODUCT_DATA_FAIL })
                cb(null)
            }
        } catch (err) {
            // dispatch({ type: types.PRODUCT_DATA_FAIL })
            console.log("err1", err)
            cb(null)
           
        }
}
}

export const editProduct = (body,cb) => {
    return async dispatch => {
        try {
            // dispatch({ type: types.PRODUCT_DATA_REQUEST })
            const response = await Request({
                url: `${Server_Url}editProduct`,
                method: 'PUT',
                body
              
            })
            console.log('products', response)
            if (response.responseCode === 200) {
                // dispatch({type: types.PRODUCT_DATA_SUCCESS, payload: response.data})

                    cb(true)
               
            } else {
                // dispatch({ type: types.PRODUCT_DATA_FAIL })
                cb(false)
            }
        } catch (err) {
            // dispatch({ type: types.PRODUCT_DATA_FAIL })
            console.log("err1", err)
            cb(false)
           
        }
}
}