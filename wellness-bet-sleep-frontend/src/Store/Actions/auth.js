import { authTypes } from './actionTypes';
import axios from './../../axios-sleep';

export const initOAuth = user => dispatch =>  {
    dispatch({
        type: authTypes.OAUTH_START
    })
    console.log(user, 'init user token')
    // change axios custom config. sets headers to uid in App.js
    axios.defaults.headers.common['Authorization'] = user.token
    axios
        .get(`/api/users`)
        .then(res => {
            console.log(res, 'inside fetch')
            const payload = {
                usersData: {
                    ...user,
                    // ...res.data
                }
            }
            dispatch({
                type: authTypes.OAUTH_SUCCESS,
                payload: payload
              });
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: authTypes.OAUTH_FAIL
            })
        })
}

export const getProfile = id => dispatch =>  {
    dispatch({
        type: authTypes.PROFILE_START
    })
    // console.log(user, 'init user token')
  
    // axios.defaults.headers.common['Authorization'] = user.token
    // const user_id = user.id
    axios
        .get(`/api/users/${id}`)
        .then(res => {
            console.log(res, 'inside fetch')
            const payload = {
                usersData: {
                    
                    ...res.data
                }
            }
            dispatch({
                type: authTypes.PROFILE_SUCCESS,
                payload: payload
              });
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: authTypes.PROFILE_FAIL,
                error: err
            })
        })
}

export const register = (user) => dispatch => {
    dispatch({
        type: authTypes.REGISTER_START
    })
    axios.defaults.headers.common['Authorization'] = user.ra
    axios
        .post(`/api/users/register`, user )
        .then(res => {
            // console.log(res.data.user.id, 'in register action')
            const payload = {
                ...res.data,
                ...user
            }
            dispatch({
                type: authTypes.REGISTER_SUCCESS,
                payload: payload
            })
        })
        .catch(err => {
            dispatch({
                type: authTypes.REGISTER_FAIL,
                payload: err
            })
        })
}


export const login = user => dispatch =>  {
    
    dispatch({
        type: authTypes.LOGIN_START
    })
    const user_id = user.uid
    console.log(user, 'top of google login')
    // change axios custom config. sets headers to uid in App.js
    axios.defaults.headers.common['Authorization'] = user.ra
    axios
        .get(`/api/users/${user_id}`)
        .then(res => {
            console.log(res, 'inside google login')
            dispatch({
                type: authTypes.LOGIN_SUCCESS,
                payload: res.data
              });
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: authTypes.LOGIN_FAIL,
                payload: err 
            })
        })
}