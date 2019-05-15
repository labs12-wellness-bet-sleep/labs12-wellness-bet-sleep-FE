import { authTypes } from '../Actions/actionTypes.js';

const initialState = {
    user: [],
    loading: false,
    error: null
};

export default (state = initialState, actions) => {
    console.log(actions)
    switch (actions.type) {
        case authTypes.OAUTH_START:
            return {
                ...state,
                loading: true
            }
        case authTypes.OAUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: {
                    ...actions.payload.usersData
                }
            }
        case authTypes.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case authTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                // user: actions.payload
            }
        case authTypes.REGISTER_FAIL:
            return {
                ...state,
                error: actions.payload
            }
        case authTypes.LOGIN__START:
            return {
                ...state,
                loadin: true
            }
        case authTypes.LOGIN__SUCCESS: 
            return {
                ...state,
                loading: false,
                user: {
                    ...actions.payload.usersData,
                    ...actions.payload.usersData.user.email
                }
            
            }
        case authTypes.LOGIN_FAIL: 
            return {
                error: actions.payload
            
        }
            default:
            return state;
    };

  

}