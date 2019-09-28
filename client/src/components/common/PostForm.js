import React from 'react';

const PostForm = ({header, children, onSubmit, error}) => {
  return (
    <div className='post-form-container white-container flex fd-c jc-c ai-c'>
      <h1>{header}</h1>
      <form onSubmit={onSubmit}>
        {children}
        <button className='cta button-dark'>submit</button>
      </form>
      { error ? <div className='form-error'>{error}</div> : null }
    </div>
  );
}

export default PostForm;
