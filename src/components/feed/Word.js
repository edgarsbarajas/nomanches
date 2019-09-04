import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Word.css';
import VoteIcon from './VoteIcon';

// click upvote or downvote - calls handleVoteOptionClick
  // if user has never voted:
  //   POST votes
  // if user clicks on vote that they have voted on:
  //   DELETE the vote
  // if user clicks on other vote option once theyve already


class Word extends Component {
  state = {

  };

  renderUpvotes() {
    const { user, word } = this.props;
    const currentUsersUpvote = this.state.upvotes.filter(upvote => upvote.user_id === user.id)[0];

    if(user && currentUsersUpvote) {
      return <VoteIcon
              fill='#00B300'
              upvote
              voted
              id={currentUsersUpvote.id}
              wordId={word.id}
             />
    }

    return <VoteIcon upvote wordId={word.id}/>
  }

  renderDownvotes() {
    const { user, word } = this.props;
    const currentUsersDownvote = this.state.downvotes.filter(down => down.user_id === user.id)[0];

    if(user && currentUsersDownvote) {
      return <VoteIcon
              fill='#DB162F'
              voted
              wordId={word.id}
              id={currentUsersDownvote.id}
             />
    }

    return <VoteIcon wordId={word.id} />
  }

  componentDidMount() {
    const { votes } = this.props.word;

    const upvotes = votes.filter(vote => vote.upvote);
    const downvotes = votes.filter(vote => !vote.upvote);

    this.setState({ upvotes, downvotes });
  }

  render() {
    const { word } = this.props;
    const { comments } = word;
    const { upvotes, downvotes } = this.state;

    if(upvotes && downvotes) {
      return (
        <div className='word white-container'>
          <h2>{word.word}</h2>
          <p className='definition'>{word.definition}</p>
          <p className='example'>{word.example}</p>
          <div className='publish-details'>
            <p>
              by <Link to={`/words/${word.user.username}`} className='author'> {word.user.username}</Link> <span className='bullet'></span> {moment(word.created_at).format('MMMM Do, YYYY')}
            </p>
          </div>
          <div className='votes'>
            <span>{upvotes.length}</span>
            {this.renderUpvotes()}
            {this.renderDownvotes()}
            <span>{downvotes.length}</span>
          </div>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Word)
