import React, { Component } from 'react';
import InfiniteScroll from '../common/InfiniteScroll';

class Feed extends Component {
  render() {
    return (
      <div className='feed'>
        <InfiniteScroll
          url='/words/feed'
        />
      </div>
    );
  }
}

export default Feed;
