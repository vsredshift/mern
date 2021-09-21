import axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types'
import { returnErrors } from './errorActions'

// CHECK token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING })

    
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR,
            })
        })
}

// REGISTER user
export const register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // REQUEST body
    const body = JSON.stringify({ name, email, password})

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "Registration failed!"))
            dispatch({type: REGISTER_FAIL})
            
    })
}


// LOGIN
export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"))
            dispatch({type: LOGIN_FAIL})
        })
}


// LOGOUT
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


export const tokenConfig = getState => {

    // GET token from local storage
    const token = getState().auth.token
    
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json',
        }
    }

    // IF token, ADD to headers
    if (token) config.headers['x-auth-token'] = token

    return config

}