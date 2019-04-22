import { SET_CURRENT_USER, SET_AUTH_ERRORS } from '../actions/types';
import axios from 'axios';

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
}

export const setAuthTokenInLocalStorage = token => {
  token = token || '';

  if(token) {
    return localStorage.setItem('auth_token', `Token ${token}`);
  }

  return localStorage.removeItem('auth_token');
}

export const setAuthorizationHeader = token => {
  token = token || '';

  if(token) {
    return axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  }

  return axios.defaults.headers.common['Authorization'] = '';
}

export const setAuthErrors = errors => {
  return {
    type: SET_AUTH_ERRORS,
    payload: errors
  };
}
