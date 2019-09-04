import axios from 'axios';
import { SET_ADD_WORD_ERRORS, SET_FEED } from './types';


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
}

export const fetchFeed = () => dispatch => {
  axios
    .get('/v1/words')
    .then(response => dispatch(setFeed(response.data)))
    .catch(error => console.log(error))
}

export const setFeed = words => ({ type: SET_FEED, payload: words });
