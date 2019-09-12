import axios from 'axios';
import { SET_ADD_WORD_ERRORS } from './types';


export const addWord = ({ word, definition, example }) => dispatch => {
  axios
    .post('/v1/words', {
      word: {
        word,
        definition,
        example
      }
    })
    .then(response => {
      dispatch({ type: SET_ADD_WORD_ERRORS, payload: {}})
    })
    .catch(error => dispatch({ type: SET_ADD_WORD_ERRORS, payload: error.response.data}))
};
