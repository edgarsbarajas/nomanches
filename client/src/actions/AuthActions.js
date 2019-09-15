import axios from 'axios';
import {
  setAuthTokenInLocalStorage,
  setAuthorizationHeader,
  setCurrentUser,
} from '../helpers';
import {
  SET_REGISTER_ERRORS
} from './types';
import { setGlobalModalComponent } from './GlobalModalActions';

export const logoutUser = () => dispatch => {
  // remove the token from localStorage
  setAuthTokenInLocalStorage();
  // clear the user from redux store
  dispatch(setCurrentUser({}));
  // clear the authorization header from axios
  setAuthorizationHeader();
}

export const handleAuthSuccess = user => dispatch => {
  // Set axios auth header
  setAuthorizationHeader(user.token)
  // Set current user in redux store
  dispatch(setCurrentUser(user))
  // Close the global modal if user is logging in through the modal
  dispatch(setGlobalModalComponent(null))
}
