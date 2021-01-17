import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import classNames from 'classnames';

import SVG from '../common/SVG';

class Comment extends Component {

  state = {
    likeCount: 1,
    liked: false,
    repliesExpanded: false,
    replies: [],
    currentRepliesPage: 1,
    repliesCount: 0,
    lastRepliesPage: 1,
  }

  toggleRepliesSection = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      repliesExpanded: !prevState.repliesExpanded
    }), () => {
      if(this.state.repliesExpanded && this.state.currentRepliesPage === 1 && this.props.comment.commentCount > 0) {
        console.log('requesting replies');
        this.requestReplies(event);
      }
    })
  }

  requestReplies = () => {
    const {currentRepliesPage} = this.state;
    const {comment} = this.props;

    axios
      .get(`/comments/parent/${comment._id}/page/${currentRepliesPage}`)
      .then(response => {
        this.setState((prevState) => {
          return {
            currentRepliesPage: prevState.currentRepliesPage + 1,
            replies: [...prevState.replies, ...response.data.comments],
            lastCommentPage: response.data.lastPage
          }
        });
      })
      .catch(error => {
        console.log('error from comments from comments', error)
      })
  }

  render() {
    const {likeCount, liked, repliesExpanded, replies} = this.state;
    const {comment} = this.props;

    return (
      <div className='comment mb-l'>
        <div className='flex'>
          <div>
            <Link to={`/${comment.user.username}`} className="fw-b profile-pic mr-m">{comment.user.username[0]}</Link>
          </div>
          <div>
            <div className='flex'>
              <Link to={`/${comment.user.username}`} className="fw-b mr-m">{comment.user.username}</Link>
              <span className='fc-medium'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <div>{comment.value}</div>
            <div className='flex ai-c mt-s'>
              <div className='mr-s'>
                <SVG 
                  name='upvote'
                  fill={liked ? '#00b300' : '#797979'}
                  height="24"
                  width="18"
                  viewBox="0 0 500 400"
                />
              </div>
              <span className='fc-medium mr-l'>{likeCount}</span>
              <button className='no-bg no-border fc-medium uppercase cursor-pointer'>reply</button>
            </div>
            {
              (comment.commentable && comment.commentCount) > 0 ? (
                <div>
                  <button className={classNames('no-bg no-border fc-dark cursor-pointer', {'mb-m': repliesExpanded})} onClick={this.toggleRepliesSection}>
                    <span className={classNames('carrot', {closed: !repliesExpanded, open: repliesExpanded})}></span>
                    View {comment.commentCount} {comment.commentCount === 1 ? 'reply' : 'replies'}
                  </button>
                  {
                    repliesExpanded ? (
                      replies.map(reply => <Comment key={reply._id} comment={reply}/>)
                    ) : null
                  }
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;