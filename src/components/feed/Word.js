import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Word.css';
import VoteIcon from './VoteIcon';

class Word extends Component {
  renderUpvotes() {
    const { user, word } = this.props;
    const currentUsersUpvote = user._id && word.votes.up.filter(upvote => upvote.user === user._id)[0];

    if(Object.keys(user).length > 0 && currentUsersUpvote) {
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
    const currentUsersDownvote = user._id && word.votes.down.filter(downvote => downvote.user === user._id)[0];

    if(Object.keys(user).length > 0 && currentUsersDownvote) {
      console.log('why here');
      return <VoteIcon
              fill='#DB162F'
              voted
              wordId={word.id}
              id={currentUsersDownvote.id}
             />
    }

    return <VoteIcon wordId={word.id} />
  }

  render() {
    const { word } = this.props;
    const { votes } = word;
    const { comments } = word;

    return (
      <div className='word white-container'>
        <h2>{word.value}</h2>
        <p className='definition'>{word.definition}</p>
        <p className='example'>{word.example}</p>
        <div className='publish-details'>
          <p>
            by <Link to={`/words/${word.user.username}`} className='author'> {word.user.username}</Link> <span className='bullet'></span> {moment(word.created_at).format('MMMM Do, YYYY')}
          </p>
        </div>
        <div className='votes'>
          <span>{votes.up.length}</span>
          {this.renderUpvotes()}
          {this.renderDownvotes()}
          <span>{votes.down.length}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Word)
