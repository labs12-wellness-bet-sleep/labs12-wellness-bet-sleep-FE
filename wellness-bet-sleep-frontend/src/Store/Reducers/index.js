import authReducer from "./auth.js";
import {combineReducers} from "redux";
import groupReducer from './groups.js';

export default combineReducers({auth: authReducer, groups: groupReducer }); 
// groups: groupReducer