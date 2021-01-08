import React, { Fragment } from 'react';
import classNames from 'classnames';

const PostForm = ({
  header, 
  children, 
  onSubmit, 
  error, 
  rightAlignButtons, 
  fullWidth, 
  includeCancelButton, 
  onCancelButtonClick
}) => {
  return (
    <Fragment>
      <h1>{header}</h1>
      <form onSubmit={onSubmit} className={classNames({'full-width': fullWidth})}>
        {children}
        <div className={classNames('button-container', {'right-align': rightAlignButtons})}>
          { includeCancelButton && <button className='cta button-light mr-m' onClick={onCancelButtonClick}>cancel</button> }
          <button className='cta button-dark'>submit</button>
        </div>
      </form>
      { error ? <div className='form-error'>{error}</div> : null }
    </Fragment>
  );
}

export default PostForm;
