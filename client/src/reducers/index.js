import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GlobalModalReducer from './GlobalModalReducer';

export default combineReducers({
  auth: AuthReducer,
  globalModalComponent: GlobalModalReducer
})
