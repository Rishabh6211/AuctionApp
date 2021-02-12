import { combineReducers } from 'redux';
import { counterReducer,productReducer,loginReducer} from '../reducres/';

const combineReducer = combineReducers({
    counterReducer,
    productReducer,
    loginReducer
});

export default combineReducer;