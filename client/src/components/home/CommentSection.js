import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Input from '../common/Input';
import PostForm from '../common/PostForm';

class CommentSection extends React.Component {
  
  state = {
    comment: '',
    expandCommentSection: false,
    displayCommentInput: false,
    errors: {},
    requestedFirstSetOfComments: false,
    currentPage: 1,
    comments: [],
    commentCount: 0,
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

    this.setState((prevState) => {
      return {
        expandCommentSection: !prevState.expandCommentSection
      }
    })
  }

  toggleCommentInput = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      return {
        displayCommentInput: !prevState.displayCommentInput
      }
    })
  }

  requestComments = () => {
    const {requestedFirstSetOfComments, currentPage} = this.state;
    const {wordId} = this.props;

    if(!requestedFirstSetOfComments && currentPage === 1) {
      this.setState({requestedFirstSetOfComments: true});

      axios
        .get(`/comments/parent/${wordId}/page/${currentPage}`)
        .then(response => {
          console.log(response.data);
          this.setState({comments: response.data.comments});
        })
        .catch(error => console.log(error))
    }
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
            commentCount: prevState.commentCount + 1
          }));
          console.log('respinse from new comment post', response.data);
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    // const {commentCount} = this.props;
    const {comment, errors, expandCommentSection, displayCommentInput, comments, commentCount} = this.state;

    return(
      <div className='mt-l pt-l border-top-light'>
        <div className={classNames('cursor-pointer', {'mb-l': expandCommentSection})} onClick={(e) => {this.toggleCommentsSection(e); this.requestComments();}}>
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
                }
              </div>
              <div>
                {
                  comments.length > 0 ? (
                    <div className='comment'>
                      {
                        comments.map(comment => {
                          return <div key={comment.id}>{comment.value}</div>
                        })
                      }
                    </div>
                  ) : (
                    <div>No comments</div>
                  )
                }
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
  
}

export default CommentSection;
