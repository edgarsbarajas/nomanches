import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import App from './App';
import reducers from './reducers';
import { setAuthorizationHeader, setCurrentUser, setAuthErrors } from './helpers';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
let token = localStorage.getItem('auth_token');

if(token) {
  token = token.replace('Token ', '');

  // Set axios auth header from localStoragefd
  setAuthorizationHeader(token);
  // Get current user's info from the auth token in localStorage
  // Set current user in redux store
  axios
    .get(`/v1/users/${token}`)
    .then(response => store.dispatch(setCurrentUser(response.data)))
    .catch(errors => store.dispatch(setAuthErrors(errors.response.data)))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
