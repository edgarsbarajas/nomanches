import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import { setAuthorizationHeader, setCurrentUser } from './helpers';
import store from './store';

// apply the token in local storage to the axios auth headers
const authToken = localStorage.getItem('auth_token') || '';

if(authToken) {
  setAuthorizationHeader(authToken);

  // if there is an auth token, request the user info from server then save it into redux store
  axios
    .get('/auth/authenticate')
    .then(response => store.dispatch(setCurrentUser(response.data)))
    .catch(error => {
      console.log('error!', error.response.data)
    })
}

ReactDOM.render(<App />, document.getElementById('root'));
