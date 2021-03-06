export const authTypes = {
    OAUTH_START: 'AUTH_STARTING',
    OAUTH_SUCCESS: 'AUTH_SUCCESS',
    OAUTH_FAIL: 'AUTH_FAIL',

    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',

    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    
    PROFILE_START: 'PROFILE_START',
    PROFILE_SUCCESS: 'PROFILE_SUCCESS',
    PROFILE_FAIL: 'PROFILE_FAIL',
};

export const groupTypes = {
    ADD_GROUP_START: "ADD_GROUP_START",
    ADD_GROUP_SUCCESS: "ADD_GROUP_SUCCESS",
    ADD_GROUP_FAILURE: "ADD_GROUP_FAILURE",

    CREATE_JOIN_CODE_START: "CREATE_JOIN_CODE_START",
    CREATE_JOIN_CODE_SUCCESS: "CREATE_JOIN_CODE_SUCCESS",
    CREATE_JOIN_CODE_FAIL: "CREATE_JOIN_CODE_FAIL",
    
    FETCH_GROUPS_START: "FETCH_GROUPS_START",
    FETCH_GROUPS_SUCCESS: "FETCH_GROUPS_SUCCESS",
    FETCH_GROUPS_FAILURE: "FETCH_GROUPS_FAILURE",
    
    UPDATE_GROUP_START: "UPDATE_GROUP_START",
    UPDATE_GROUP_SUCCESS: "UPDATE_GROUP_SUCCESS",
    UPDATE_GROUP_FAILURE: "UPDATE_GROUP_FAILURE",
    
    DELETE_GROUP_START: "DELETE_GROUP_START",
    DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",
    DELETE_GROUP_FAILURE: "DELETE_GROUP_FAILURE"
};

export const participantTypes = {
    ADD_PARTICIPANT_START: 'ADD_PARTICIPANT_START',
    ADD_PARTICIPANT_SUCCESS: 'ADD_PARTICIPANT_SUCCESS',
    ADD_PARTICIPANT_FAIL: 'ADD_PARTICIPANT_FAIL'
}