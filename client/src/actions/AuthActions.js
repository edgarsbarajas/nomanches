import axios from 'axios';
import { setAuthTokenInLocalStorage, setAuthorizationHeader, setCurrentUser, setAuthErrors } from '../helpers';

export const loginUser = ({ email, password }) => dispatch => {
  axios
    .post('/v1/login', {
      email, password
    })
    .then(response => handleSuccess(response, dispatch))
    .catch(error => dispatch(setAuthErrors(error.response.data)))
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
    .then(response => handleSuccess(response, dispatch))
    .catch(error => dispatch(setAuthErrors(error.response.data)))
}

const handleSuccess = (response, dispatch) => {
  const user = response.data;
  // Set auth token in localStorage
  setAuthTokenInLocalStorage(user.auth_token);
  // Set axios auth header
  setAuthorizationHeader(user.auth_token);
  // Set current user in redux store
  dispatch(setCurrentUser(user));
}
