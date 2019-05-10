import axios from "../../axios-sleep";
import { groupTypes } from "./actionTypes";

export const getGroups = () => dispatch => {
  dispatch({ type: groupTypes.FETCH_GROUPS_START });
  axios
    .get("/api/groups", {
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

export const addGroup = (group, userId) => dispatch => {
  dispatch({ type: groupTypes.ADD_GROUP_START });

  const newGroup = {
    userId,
    joinCode: group.joinCode
  };
  axios
    .post("/api/groups", newGroup, {
      "Content-Type": "application/json",
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(res =>
      dispatch({ type: groupTypes.ADD_GROUP_SUCCESS, payload: res.data })
    )
    .catch(err => {
      dispatch({
        type: groupTypes.ADD_GROUP_FAILURE,
        payload: err
      });
    });
};

export const updateGroup = (group, id) => dispatch => {
  dispatch({
    type: groupTypes.UPDATE_GROUP_START
  });

  axios
    .put(`/api/groups/${id}`, group, {
      "Content-Type": "application/json",
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({
        type: groupTypes.UPDATE_GROUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: groupTypes.UPDATE_GROUP_FAILURE,
        payload: err
      });
    });
};

export const deleteWorkout = id => dispatch => {
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
