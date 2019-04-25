import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import WordReducer from './WordReducer';

export default combineReducers({
  auth: AuthReducer,
  words: WordReducer
})
