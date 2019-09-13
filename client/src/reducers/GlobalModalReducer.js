import { SET_GLOBAL_MODAL_COMPONENT } from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_GLOBAL_MODAL_COMPONENT:
      return action.payload;
    default:
      return state;
  }
}
