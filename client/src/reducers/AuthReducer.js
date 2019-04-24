import {
  SET_CURRENT_USER,
  SET_LOGIN_ERRORS
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  loginErrors: {},
  registerErrors: {}
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case SET_CURRENT_USER:
      return {...state, user: action.payload};
    case SET_LOGIN_ERRORS:
      return {...state, loginErrors: action.payload};
    default:
      return state;
  }
}
