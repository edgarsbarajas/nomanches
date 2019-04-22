import axios from 'axios';

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
    .then(response => {
      // Set auth token in localStorage
      localStorage.setItem('auth_token', `Token ${response.data.auth_token}`);
      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Token ${response.data.auth_token}`;
    })
    .catch(error => console.log('ERROR!!!!!!!!!!!', error))
}
