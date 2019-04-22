import { SET_LOGIN_INPUT } from './types';
import axios from 'axios';

export const onInputChange = event => {
  return {
    type: SET_LOGIN_INPUT,
    payload: {
      name: event.target.name,
      value: event.target.value
    }
  }
}

export const loginUser = ({ email, password }) => dispatch => {
  axios
    .post('/v1/login', {
      email, password
    })
    .then(response => {
      // Set auth token in localStorage
      localStorage.setItem('auth_token', `Token ${response.data.auth_token}`);
      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Token ${response.data.auth_token}`;
    })
    .catch(error => console.log('ERROR!!!!!!!!!!!', error))
}
