import axios from "../../axios-sleep";
import { groupTypes } from "../Actions/actionTypes";

const initialState = {
  addGroup: false,
  groups: [],
  groupId: null,
  joinCode: null,
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

    case groupTypes.DELETE_GROUP_START:
      return {
        ...state,
        fetching: true,
        errors: null
      };

    case groupTypes.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        fetching: false,
        groups: state.groups.filter(group => group.id !== action.payload),
        errors: null
      };

    case groupTypes.DELETE_GROUP_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    case groupTypes.CREATE_JOIN_CODE_START:
      return {
        ...state,
        fetching: true,
        errors: null
      }
    
    case groupTypes.CREATE_JOIN_CODE_SUCCESS:
        console.log(action.payload, 'join code success reducer')
        console.log("new group join code", action.payload.joinCode)
        localStorage.setItem('joinCode', action.payload.joinCode)
      return {
        ...state,
        fetching: false,
        joinCode: action.payload
      }
    
      case groupTypes.CREATE_JOIN_CODE_FAIL:
        return {
          ...state,
          fetching: false,
          errors: action.payload
        }

    default:
      return state;
  }
};
