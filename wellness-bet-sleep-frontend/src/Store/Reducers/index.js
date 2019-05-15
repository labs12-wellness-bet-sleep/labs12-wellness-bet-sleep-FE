import authReducer from "./auth.js";
import {combineReducers} from "redux";
import groupReducer from './groups.js';

<<<<<<< HEAD
export default combineReducers({
    auth: authReducer
}); 
=======
export default combineReducers({auth: authReducer, groups: groupReducer }); 
// groups: groupReducer
>>>>>>> 9d55577319eec988f8b7022b3d1b4240a3cea933
