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
            console.log(res.data, 'inside fetch')
            const payload = {
                usersData: {
                    ...user,
                    ...res.data
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

export const register = (user) => dispatch => {
    dispatch({
        type: authTypes.REGISTER_START
    })
    axios.defaults.headers.common['Authorization'] = user.ra
    axios
        .post(`/api/users/register`, user )
        .then(res => {
            console.log(res, 'in register action')
            dispatch({
                type: authTypes.REGISTER_SUCCESS,
                // payload: res.data
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
    console.log(user, 'top of google login')
    // change axios custom config. sets headers to uid in App.js
    axios.defaults.headers.common['Authorization'] = user.ra
    axios
        .get(`/api/users/login/${user.email}`)
        .then(res => {
            console.log(user.email, 'inside google login')
            const payload = {
                usersData: {
                    ...user.email,
                    ...res.data
                }
            }
            dispatch({
                type: authTypes.LOGIN_SUCCESS,
                payload: payload
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