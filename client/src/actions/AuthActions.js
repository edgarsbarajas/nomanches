import axios from 'axios';
import {
  setAuthTokenInLocalStorage,
  setAuthorizationHeader,
  setCurrentUser,
} from '../helpers';
import {
  SET_LOGIN_ERRORS,
  SET_REGISTER_ERRORS
} from './types';
import { setGlobalModalComponent } from './GlobalModalActions';

export const loginUser = ({ username, password }) => dispatch => {
  axios
    .post('http://localhost:3001/auth/login', {
      username, password
    })
    .then(response => handleSuccess(response, dispatch))
    .catch(error => dispatch({ type: SET_LOGIN_ERRORS, payload: error.response.data}))
}

export const registerUser = ({ firstName, lastName, email, username, password }) => dispatch => {
  axios
    .post('/users', {
        firstName,
        lastName,
        email,
        username,
        password
      }
    )
    .then(response => handleSuccess(response, dispatch))
    .catch(error => {
      console.log('error', error.response.data.errors);
      dispatch({ type: SET_REGISTER_ERRORS, payload: error.response.data.errors})
    })
}

export const logoutUser = () => dispatch => {
  // remove the token from localStorage
  setAuthTokenInLocalStorage();
  // clear the user from redux store
  dispatch(setCurrentUser({}));
  // clear the authorization header from axios
  setAuthorizationHeader();
}

const handleSuccess = (response, dispatch, errorsToClear) => {
  const user = response.data;
  console.log('user from handle success', user);
  // Set auth token in localStorage
  // setAuthTokenInLocalStorage(user.token);
  // Set axios auth header
  setAuthorizationHeader(user.token);
  // Set current user in redux store
  dispatch(setCurrentUser(user));
  // Close the global modal if user is logging in through the modal
  dispatch(setGlobalModalComponent(null));
}
