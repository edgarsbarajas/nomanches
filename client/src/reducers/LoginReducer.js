import { SET_LOGIN_INPUT } from '../actions/types';

const INITIAL_STATE = {
  email: 'edgarsbarajas@yahoo.com',
  password: 'password'
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_LOGIN_INPUT:
      return {...state, [action.payload.name]: action.payload.value};
    default:
      return state;
  }
}
