import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Word.css';
import VoteIcon from './VoteIcon';

class Word extends Component {
  state = {
    word: this.props.word
  };

  onVoteSuccess = word => {
    this.setState({ word });
  }

  renderUpvotes() {
    const { user } = this.props;
    const { word } = this.state;
    const currentUsersUpvote = user.id ? word.votes.up.filter(upvote => upvote.user === user.id) : [];

    if(Object.keys(user).length > 0 && currentUsersUpvote.length > 0) {
      return <VoteIcon
               fill='#00B300'
               upvote={true}
               voted
               wordId={word._id}
               onVoteSuccess={this.onVoteSuccess}
             />
    }

    return <VoteIcon
             upvote={true}
             wordId={word._id}
             onVoteSuccess={this.onVoteSuccess}
           />
  }

  renderDownvotes() {
    const { user } = this.props;
    const { word } = this.state;
    const currentUsersDownvote = user.id ? word.votes.down.filter(downvote => downvote.user === user.id) : [];

    if(Object.keys(user).length > 0 && currentUsersDownvote.length > 0) {
      return <VoteIcon
               fill='#DB162F'
               upvote={false}
               voted
               wordId={word._id}
               onVoteSuccess={this.onVoteSuccess}
             />
    }

    return <VoteIcon
             upvote={false}
             wordId={word._id}
             onVoteSuccess={this.onVoteSuccess}
           />
  }

  render() {
    const { word } = this.state;
    const { votes } = word;

    console.log('WORD state', word);
    console.log('WORD props', this.props.word);
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
