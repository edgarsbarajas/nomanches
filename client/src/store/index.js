import { createStore, applyMiddleware, } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import { setAuthorizationHeader } from '../helpers';

export default createStore(rootReducer, applyMiddleware(ReduxThunk));
