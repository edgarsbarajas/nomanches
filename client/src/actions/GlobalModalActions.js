import { SET_GLOBAL_MODAL_COMPONENT } from './types';

export const setGlobalModalComponent = (component) => {
  return { type: SET_GLOBAL_MODAL_COMPONENT, payload: component };
}
