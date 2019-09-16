import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteIcon from './VoteIcon';

class VoteSection extends Component {
  renderUpvotes() {
    const { user, word, onVoteSuccess } = this.props;
    const currentUsersUpvote = user.id ? word.votes.up.filter(upvote => upvote.user === user.id) : [];

    if(Object.keys(user).length > 0 && currentUsersUpvote.length > 0) {
      return <VoteIcon
               fill='#00B300'
               upvote={true}
               voted
               wordId={word._id}
               onVoteSuccess={onVoteSuccess}
             />
    }

    return <VoteIcon
             upvote={true}
             wordId={word._id}
             onVoteSuccess={onVoteSuccess}
           />
  }

  renderDownvotes() {
    const { user, word, onVoteSuccess } = this.props;
    const currentUsersDownvote = user.id ? word.votes.down.filter(downvote => downvote.user === user.id) : [];

    if(Object.keys(user).length > 0 && currentUsersDownvote.length > 0) {
      return <VoteIcon
               fill='#DB162F'
               upvote={false}
               voted
               wordId={word._id}
               onVoteSuccess={onVoteSuccess}
             />
    }

    return <VoteIcon
             upvote={false}
             wordId={word._id}
             onVoteSuccess={onVoteSuccess}
           />
  }

  render() {
    const { up, down } = this.props.word.votes;
    return (
      <div className='votes'>
        <span>{up.length}</span>
        {this.renderUpvotes()}
        {this.renderDownvotes()}
        <span>{down.length}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(VoteSection);
