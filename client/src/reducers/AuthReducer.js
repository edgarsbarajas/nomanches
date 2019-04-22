import {
  SET_CURRENT_USER,
  SET_AUTH_ERRORS
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  errors: {}
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case SET_CURRENT_USER:
      return {...state, user: action.payload};
    case SET_AUTH_ERRORS:
      return {...state, errors: action.payload};
    default:
      return state;
  }
}
