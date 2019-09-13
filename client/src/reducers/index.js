import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import WordReducer from './WordReducer';
import GlobalModalReducer from './GlobalModalReducer';

export default combineReducers({
  auth: AuthReducer,
  words: WordReducer,
  globalModalComponent: GlobalModalReducer
})
