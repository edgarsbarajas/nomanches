import axios from 'axios';

export const loginUser = ({ email, password }) => dispatch => {
  console.log('clicked!!!!!', email, password);
  axios
    .post('/v1/login', {
      email, password
    })
    .then(response => {
      console.log('WTFFFFFFFFFFF');
      // Set auth token in localStorage
      localStorage.setItem('auth_token', `Token ${response.data.auth_token}`);
      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Token ${response.data.auth_token}`;
    })
    .catch(error => console.log('ERROR!!!!!!!!!!!', error))

    console.log('wtf is happening');
}
