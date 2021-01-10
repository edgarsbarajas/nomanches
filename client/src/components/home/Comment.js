import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const Comment = ({comment}) => {
  return (
    <div className='comment mb-l flex'>
      <div className='profile-pic mr-m'>
        <Link to={`/${comment.user.username}`} className="fw-b">{comment.user.username[0]}</Link>
      </div>
      <div>
        <div className="flex">
          <Link to={`/${comment.user.username}`} className="fw-b mr-m">{comment.user.username}</Link>
          <span className='fc-medium'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <div>{comment.value}</div>
      </div>
    </div>
  );
}

export default Comment;