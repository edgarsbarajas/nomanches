import { SET_ADD_WORD_ERRORS } from '../actions/types';

const INITIAL_STATE = {
  addWordErrors: {}
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_ADD_WORD_ERRORS:
      return {...state, addWordErrors: action.payload};
    default:
      return state;
  }
}
