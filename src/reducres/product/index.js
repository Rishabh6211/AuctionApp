import * as types from '../../actionTypes'

const INITIAL_STATE = {
    loading: false,
    productData: [],
    listingData:[],
    productData:{}
    // categoryData:[]
}

export default function productData(state = INITIAL_STATE, action) { // reducres are create to get active user
   
    switch (action.type) {
        case types.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
               
            }
            break;
        
        case types.GET_PRODUCT_SUCCESS:
            var auction  = action.payload.filter(item => item.auctionChoice == "Auction");
            var fixedCose = action.payload.filter(item => item.auctionChoice == "Fixed Cost");
            return {
                ...state,
                productData: action.payload,
                auctions:auction,
                fixCost:fixedCose,
                loading: false,
               
            }
            break;
        case types.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                
            }
            case types.GET_CATEGORY_REQUEST:
                return {
                    ...state,
                    loading: true,
                   
                }
                break;
            
            case types.GET_CATEGORY_SUCCESS:
               
                return {
                    ...state,
                    categoryData: action.payload,
                    loading: false,
                   
                }
                break;
            case types.GET_CATEGORY_FAIL:
                return {
                    ...state,
                    loading: false,
                    
                }
            case types.MY_LISTING_REQUEST:
                return {
                    ...state,
                    loading: true,
                    
                }
                break;
            
            case types.MY_LISTING_SUCCESS:
                
                return {
                    ...state,
                    listingData: action.payload,
                    loading: false,
                    
                }
                break;
            case types.MY_LISTING_FAIL:
                return {
                    ...state,
                    loading: false,
                    
                }
                case types.CATEGORY_DATA_REQUEST:
                    return {
                        ...state,
                        loading: true,
                       
                    }
                    break;
                
                case types.CATEGORY_DATA_SUCCESS:
                   
                    return {
                        ...state,
                        listingData: action.payload,
                        loading: false,
                       
                    }
                    break;
                case types.CATEGORY_DATA_FAIL:
                    return {
                        ...state,
                        loading: false,
                        
                    }

                    case types.PRODUCT_DATA_REQUEST:
                        return {
                            ...state,
                            loading: true,
                           
                        }
                        break;
                    
                    case types.PRODUCT_DATA_SUCCESS:
                       
                        return {
                            ...state,
                            productData: action.payload,
                            loading: false,
                           
                        }
                        break;
                    case types.PRODUCT_DATA_FAIL:
                        return {
                            ...state,
                            loading: false,
                            
                        }
        }
    return state;
}