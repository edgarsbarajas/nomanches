import React from 'react';
import classNames from 'classnames';
import Input from '../common/Input';
import PostForm from '../common/PostForm';

class CommentSection extends React.Component {
  
  state = {
    comment: '',
    expandCommentSection: false,
    displayCommentInput: false,
    errors: {}
  };

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

  render() {
    const {comments} = this.props;
    const {comment, errors, expandCommentSection, displayCommentInput} = this.state;

    return(
      <div className='mt-l pt-l border-top-light'>
        <div className={classNames('cursor-pointer', {'mb-l': expandCommentSection})} onClick={this.toggleCommentsSection}>
          Comments 
          <span className='bullet'></span> 
          {comments.length} 
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
                        onSubmit={this.onSubmit}
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
              {
                comments.map(comment => <div>{comment.value}</div>)
              }
            </div>
          ) : null
        }
      </div>
    );
  }
  
}

export default CommentSection;
