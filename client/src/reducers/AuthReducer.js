import {
  SET_CURRENT_USER
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  loginErrors: {},
  registerErrors: {}
}

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch(action.type) {
    case SET_CURRENT_USER:
      return {...state, user: action.payload, loginErrors: {}, registerErrors: {}};
    default:
      return state;
  }
}
