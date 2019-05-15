import authReducer from "./auth.js";
import {combineReducers} from "redux";
import groupReducer from './groupReducer.js';

export default combineReducers({auth: authReducer, groups: groupReducer }); 
