import { SET_LOGIN_INPUT } from './types';

export const onInputChange = event => {
  return {
    type: SET_LOGIN_INPUT,
    payload: {
      name: event.target.name,
      value: event.target.value
    }
  }
}
