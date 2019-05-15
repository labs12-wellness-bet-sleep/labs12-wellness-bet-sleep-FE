import axios from '../../axios-sleep';
import { groupTypes } from '../Actions/actionTypes';

const initialState = {
    addGroup: false,
    groups: [],
    groupId: null,
    fetching: false,
    errors: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case groupTypes.FETCH_GROUPS_START:
        return {
            ...state,
            fetching: true,
            errors: null
        };

        case groupTypes.FETCH_GROUPS_SUCCESS:
        return {
            ...state,
            groups: action.payload,
            fetching: false,
            errors: null
        };
        case groupTypes.FETCH_GROUPS_FAILURE:
        return {
            ...state,
            fetching: false,
            errors: action.payload            
        };
        default: 
        return state
    }
}


