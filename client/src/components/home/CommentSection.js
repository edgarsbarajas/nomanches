import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {connect} from 'react-redux';

import Comment from './Comment';
import Input from '../common/Input';
import PostForm from '../common/PostForm';

class CommentSection extends React.Component {
  state = {
    comment: '',
    expandCommentSection: false,
    displayCommentInput: false,
    errors: {},
    requestedFirstSetOfComments: false,
    comments: [],
    currentCommentPage: 1,
    commentCount: 0,
    lastCommentPage: 1
  };

  componentDidMount = () => {
    // Set the inital comment count in the state so when we add a new comment, we don't have a request a new count
    this.setState({commentCount: this.props.commentCount});
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleCommentsSection = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      expandCommentSection: !prevState.expandCommentSection
    }), () => {
      if(this.state.expandCommentSection && this.state.currentCommentPage === 1 && this.props.commentCount > 0) {
        this.requestComments(event)
      }
    })
  }

  toggleCommentInput = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      return {
        displayCommentInput: !prevState.displayCommentInput,
        comment: ''
      }
    })
  }

  onCommentSubmit = (event) => {
    event.preventDefault();

    const {comment} = this.state;
    const {wordId} = this.props;

    console.log(comment);

    if(comment) {
      axios
        .post(`/comments/${wordId}`, {
          parentType: "Word",
	        value: comment
        })
        .then(response => {
          this.setState(prevState => ({
            comments: [...prevState.comments, response.data],
            commentCount: prevState.commentCount + 1,
            comment: '',
            displayCommentInput: false
          }));
        })
        .catch(error => console.log(error));
    }
  }

  requestComments = (event) => {
    const {currentCommentPage, lastCommentPage} = this.state;
    const {wordId} = this.props;

    console.log((lastCommentPage)); 

    if(currentCommentPage <= lastCommentPage) {
      console.log('requesting some comments');

      this.setState({requestedFirstSetOfComments: true});

      axios
        .get(`/comments/parent/${wordId}/page/${currentCommentPage}`)
        .then(response => {
          console.log(response.data);
          this.setState((prevState) => {
            return {
              currentCommentPage: prevState.currentCommentPage + 1,
              comments: [...prevState.comments, ...response.data.comments],
              lastCommentPage: response.data.lastPage
            }
          });
        })
        .catch(error => console.log(error))
    }
  }

  render() {
    const {comment, errors, expandCommentSection, displayCommentInput, comments, commentCount} = this.state;
    const {user} = this.props;

    return(
      <div className='mt-l pt-l border-top-light'>
        <div className={classNames('cursor-pointer', {'mb-l': expandCommentSection})} onClick={(e) => {this.toggleCommentsSection(e);}}>
          Comments 
          <span className='bullet'></span> 
          {commentCount} 
          <span className={classNames('carrot', {closed: !expandCommentSection, open: expandCommentSection})}></span>
        </div>
        {
            expandCommentSection ? (
              <div>
                <div className="mb-l pb-l border-bottom-light">
                  {
                    Object.keys(user).length > 0 ? (

                      displayCommentInput ? (
                        <div className='form-container'>
                          <PostForm
                            onSubmit={this.onCommentSubmit}
                            header=''
                            error={errors.comment}
                            rightAlignButtons
                            fullWidth
                            includeCancelButton
                            onCancelButtonClick={this.toggleCommentInput}
                          >
                            <Input
                              type='textarea'
                              name='comment'
                              label=''
                              value={comment}
                              error={errors.comment}
                              onChange={this.onInputChange}
                              autoFocus
                            />
                          </PostForm>
                        </div>
                      ) : (
                        <button className="pre-input-focus" onClick={this.toggleCommentInput}>add a public comment...</button>
                      )
                      ) : (<Link to="/login" className="pre-input-focus">Sign in to comment...</Link>)
                  }
                </div>
                <div>
                  {
                    comments.length > 0 ? (
                      <div>
                        {
                          comments.map(comment => {
                            return <Comment key={comment._id} value={comment.value} />
                          })
                        }
                        {
                          this.state.currentCommentPage <= this.state.lastCommentPage && (
                            <button className="cta button-light border-light ta-c mt-m" onClick={this.requestComments}>
                            load more comments...
                          </button>
                          )
                        }
                      </div>
                    ) : null
                  }
                </div>
              </div>
            ) : null
          
          
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(CommentSection);
