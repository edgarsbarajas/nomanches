import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import App from './App';
import reducers from './reducers';

// Set axios auth header from localStorage
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

const store = createStore(reducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
