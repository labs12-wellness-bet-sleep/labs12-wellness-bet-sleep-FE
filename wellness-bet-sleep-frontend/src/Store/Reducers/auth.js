import { authTypes } from '../Actions/actionTypes.js';

const initialState = {
    user: [],
    loading: false,
    error: null
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
                    ...actions.payload.usersData
                }
                
            }
        case authTypes.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case authTypes.REGISTER_SUCCESS:
        localStorage.setItem('fb_id', actions.payload.firebase_id)
            return {
                ...state,
                loading: false,
                user: actions.payload
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
                loading: true
            }
        case authTypes.LOGIN_SUCCESS:
            localStorage.setItem('fb_id', actions.payload.user.firebase_id) 
            return {
                ...state,
                loading: false,
                user: actions.payload.user
            
            }
        case authTypes.LOGIN_FAIL: 
            console.log('err', actions.payload)
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