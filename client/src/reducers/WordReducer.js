import { SET_ADD_WORD_ERRORS, SET_FEED } from '../actions/types';

const INITIAL_STATE = {
  addWordErrors: {},
  feed: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_ADD_WORD_ERRORS:
      return {...state, addWordErrors: action.payload};
    case SET_FEED:
      return {...state, feed: action.payload};
    default:
      return state;
  }
}
