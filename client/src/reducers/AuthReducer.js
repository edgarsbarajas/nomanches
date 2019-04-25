import {
  SET_CURRENT_USER,
  SET_LOGIN_ERRORS,
  SET_REGISTER_ERRORS
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
      return {...state, user: action.payload, loginErrors: {}, registerErrors: {}};
    case SET_LOGIN_ERRORS:
      return {...state, loginErrors: action.payload};
    case SET_REGISTER_ERRORS:
      return {...state, registerErrors: action.payload};
    default:
      return state;
  }
}
