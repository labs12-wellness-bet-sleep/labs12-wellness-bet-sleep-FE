import axios from "../../axios-sleep";
import { groupTypes } from "./actionTypes";


export const getGroups = (id) => dispatch => {
  dispatch({ type: groupTypes.FETCH_GROUPS_START });
  axios
    .get(`/api/participant/${id}/groups`, {
      "Content-Type": "application/json",
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(res =>
      dispatch({ type: groupTypes.FETCH_GROUPS_SUCCESS, payload: res.data })
    )
    .catch(err =>
      dispatch({ type: groupTypes.FETCH_GROUPS_FAILURE, payload: err })
    );
};

export const addGroup = (userfirebase_id) => dispatch => {
  console.log("inside addgroup", userfirebase_id)
  console.log("token", localStorage.getItem("token"))
  const token = localStorage.getItem("token")
  dispatch({ type: groupTypes.ADD_GROUP_START });


  axios
    .post("/api/groups/invite", {userfirebase_id}, {
      "Content-Type": "application/json",
      headers: { 'Authorization': token }
    })
    .then(res => {
      console.log("res:",res.data.newGroup)
      return (
        dispatch({ type: groupTypes.ADD_GROUP_SUCCESS, payload: res.data.newGroup })
      )
      
    })
    .catch(err => {
      dispatch({
        type: groupTypes.ADD_GROUP_FAILURE,
        payload: err
      });
    });
};

export const updateGroup = (id, group) => dispatch => {
  console.log("id:", id)
  console.log("group1:", group)
  dispatch({
    type: groupTypes.UPDATE_GROUP_START
  });

  axios
    .put(`/api/groups/${id}`, group, {
      "Content-Type": "application/json",
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log("res::::11", res.data)
      return (
        dispatch({type: groupTypes.UPDATE_GROUP_SUCCESS, payload: res.data})
      )
      
    })
    .catch(err => {
      dispatch({
        type: groupTypes.UPDATE_GROUP_FAILURE,
        payload: err
      });
    });
};

export const deleteGroup = id => dispatch => {
  dispatch({
    type: groupTypes.DELETE_GROUP_START
  });

  axios
    .delete(`/api/groups/${id}`, {
      "Content-Type": "application/json",
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({
        type: groupTypes.DELETE_GROUP_SUCCESS,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: groupTypes.DELETE_GROUP_FAILURE,
        payload: err
      });
    });
};
