import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.js';

const rootReducer = combineReducers({
   auth: AuthReducer
});

export default rootReducer;
