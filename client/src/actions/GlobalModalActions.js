import { SET_GLOBAL_MODAL_COMPONENT } from './types';

export const setGlobalModalComponent = (component) => dispatch => {
  return dispatch({ type: SET_GLOBAL_MODAL_COMPONENT, payload: component });
}
