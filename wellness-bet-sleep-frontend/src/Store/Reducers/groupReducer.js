import axios from "../../axios-sleep";
import { groupTypes } from "../Actions/actionTypes";

const initialState = {
  addGroup: false,
  groups: [],
  addedGroups: [],
  groupId: null,
  joinCode: null,
  fetching: false,
  errors: null
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case groupTypes.FETCH_GROUPS_START:
      return {
        ...state,
        fetching: true,
        errors: null
      };

    case groupTypes.FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        groups: actions.payload,
        fetching: false,
        errors: null
      };
    case groupTypes.FETCH_GROUPS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: actions.payload
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
        groups: state.groups.filter(group => group.id !== actions.payload),
        errors: null
      };

    case groupTypes.DELETE_GROUP_FAILURE:
      return {
        ...state,
        fetching: false,
        error: actions.payload
      };

      case groupTypes.ADD_GROUP_START:
          return {
            ...state,
            fetching: true,
            errors: null
          }

      case groupTypes.ADD_GROUP_SUCCESS:
          console.log('group reducer', actions.payload.newGroup)
          return {
            ...state,
            fetching: false,
            groups: actions.payload.newGroup
            
          }

        case groupTypes.ADD_GROUP_FAILURE:
          console.log('group err:', actions.payload)
          return {
            ...state,
            fetching: false,
            errors: actions.payload
          }

        case groupTypes.UPDATE_GROUP_START:
            return {
              ...state,
              fetching: true,
              errors: null
            }
          
        case groupTypes.UPDATE_GROUP_SUCCESS:
          console.log("update reducer", actions.payload) 
            return {
              ...state,
              fetching: false,
              addedGroups: actions.payload
            }

        case groupTypes.UPDATE_GROUP_FAILURE:
            return {
              ...state,
              fetching: false,
              errors: actions.payload
            }

    default:
      return state;
  }
};
