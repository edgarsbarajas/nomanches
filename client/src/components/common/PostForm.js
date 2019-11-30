import React, { Fragment } from 'react';

const PostForm = ({header, children, onSubmit, error}) => {
  return (
    <Fragment>
      <h1>{header}</h1>
      <form onSubmit={onSubmit}>
        {children}
        <button className='cta button-dark'>submit</button>
      </form>
      { error ? <div className='form-error'>{error}</div> : null }
    </Fragment>
  );
}

export default PostForm;
