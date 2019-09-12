import axios from 'axios';

export const deleteVote = voteId => dispatch => {
  axios
    .delete(`/v1/votes/${voteId}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
}

export const submitVote = ({voteable_id, id, voteable_type, upvote}) => dispatch => {
  console.log({ voteable_id, voteable_type, upvote });
  axios
    .post(`/v1/votes`, {
        voteable_id,
        voteable_type,
        upvote
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error.response.data))
}
