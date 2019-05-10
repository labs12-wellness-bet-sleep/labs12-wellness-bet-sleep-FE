import { authTypes } from '../Actions/actionTypes.js';

const initialState = {
    user: {},
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
            default:
            return state;
    };
}