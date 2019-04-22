import { SET_LOGIN_INPUT } from '../actions/types';

const INITIAL_STATE = {
  email: 'lol',
  password: ''
}

export default (state = INITIAL_STATE, action) => {
  console.log("HELLLLLLLLLOOOO!!!!!");
  console.log(action);
  switch(action.type) {
    case SET_LOGIN_INPUT:
      return {...state, [action.payload.name]: action.payload.value};
    default:
      return state;
  }
}
