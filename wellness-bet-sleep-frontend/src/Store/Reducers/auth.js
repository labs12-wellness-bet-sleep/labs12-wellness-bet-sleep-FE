import { authTypes } from '../Actions/actionTypes.js';

const initialState = {
    user: [],
    loading: false,
    error: null,
    user_id: "",
};

export default (state = initialState, actions) => {
   
    switch (actions.type) {
        case authTypes.OAUTH_START:
            return {
                ...state,
                loading: true
            }
        case authTypes.OAUTH_SUCCESS:
        console.log(actions.payload, 'res data')
            return {
                ...state,
                loading: false,
                user: {
                    ...actions.payload.usersData.user
                },
                user_id: actions.payload.user_id 
                
            }
        case authTypes.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case authTypes.REGISTER_SUCCESS:
        console.log(actions.payload, 'register success data')
            return {
                ...state,
                loading: false,
                user: actions.payload,
                user_id: actions.payload.user_id
            }
        case authTypes.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: actions.payload
            }
        case authTypes.LOGIN_START:
            return {
                ...state,
                loadin: true
            }
        case authTypes.LOGIN_SUCCESS: 
            return {
                ...state,
                loading: false,
                user: actions.payload
            
            }
        case authTypes.LOGIN_FAIL: 
            return {
                ...state,
              loading: false,
              error: actions.payload
            
        }
        case authTypes.PROFILE_START:
          return {
              ...state,
              loading: true
          }
        case authTypes.PROFILE_SUCCESS:
          return {
              ...state,
              user: {
                  ...actions.payload
              }
          }
        case authTypes.PROFILE_FAIL: 
          return {
              ...state,
              loading: false,
              error: actions.payload
          }
            default:
            return state;
    };

  

}