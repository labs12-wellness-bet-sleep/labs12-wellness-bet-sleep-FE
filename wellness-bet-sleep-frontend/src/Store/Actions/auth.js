import { authTypes } from './actionTypes';
import axios from '../../axios-instance';

export const initOAuth = user => dispatch =>  {
    dispatch({
        type: authTypes.OAUTH_START
    })
    console.log(user, 'init user')
    // change axios custom config. sets headers to uid in App.js
    axios.defaults.headers.common['Authorization'] = user.token
    axios
        .get(`/api/users`)
        .then(res => {
            console.log(res, 'inside fetch')
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