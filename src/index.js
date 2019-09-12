import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import { setAuthorizationHeader, setCurrentUser } from './helpers';
import { persistor } from './store';

console.log('persistor', persistor);
//
// if(user) {
//   // Set axios auth header from localStoragefd
//   setAuthorizationHeader(user.token);
//   // Get current user's info from the auth token in localStorage
//   // Set current user in redux store
//   store.dispatch(setCurrentUser(user))
// }

ReactDOM.render(<App />, document.getElementById('root'));
