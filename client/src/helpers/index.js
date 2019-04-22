import { SET_CURRENT_USER, SET_AUTH_ERRORS } from '../actions/types';
import axios from 'axios';

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
}

export const setAuthTokenInLocalStorage = token => {
  localStorage.setItem('auth_token', `Token ${token}`);
}

export const setAuthorizationHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
}

export const setAuthErrors = errors => {
  return {
    type: SET_AUTH_ERRORS,
    payload: errors
  };
}
