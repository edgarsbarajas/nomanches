import axios from 'axios';
import {
  setAuthTokenInLocalStorage,
  setAuthorizationHeader,
  setCurrentUser,
} from '../helpers';
import { SET_LOGIN_ERRORS } from './types';

export const loginUser = ({ email, password }) => dispatch => {
  axios
    .post('/v1/login', {
      email, password
    })
    .then(response => handleSuccess(response, dispatch, SET_LOGIN_ERRORS))
    .catch(error => dispatch({ type: SET_LOGIN_ERRORS, payload: error.response.data}))
}

export const registerUser = ({ firstName, lastName, email, username, password }) => dispatch => {
  axios
    .post('/v1/register', {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password
      }
    })
    .then(response => handleSuccess(response, dispatch, SET_LOGIN_ERRORS))
    .catch(error => dispatch({ type: SET_LOGIN_ERRORS, payload: error.response.data}))
}

export const logoutUser = () => dispatch => {
  console.log('LOGGING OJT NOW');
  axios
    .delete('/v1/logout')
    .then(response => {
      // remove the token from localStorage
      setAuthTokenInLocalStorage();
      // clear the user from redux store
      dispatch(setCurrentUser({}));
      // clear the authorization header from axios
      setAuthorizationHeader();
    })
    .catch(error => console.log(error))
}

const handleSuccess = (response, dispatch, errorsToClear) => {
  dispatch({ type: errorsToClear, payload: {}});
  
  const user = response.data;
  // Set auth token in localStorage
  setAuthTokenInLocalStorage(user.auth_token);
  // Set axios auth header
  setAuthorizationHeader(user.auth_token);
  // Set current user in redux store
  dispatch(setCurrentUser(user));
}
