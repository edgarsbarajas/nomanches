import React, { Component } from 'react';
import Pagination from './common/Pagination';

class WordsByUser extends Component {
  render() {
    console.log('rendering words buy yser');
    const username = this.props.location.pathname.replace('/', '');
    return (
      <div className='feed'>
        <Pagination
          headline={`[word count] definitions by ${username}`}
          query={`/words/user/${username}`}
          currentPage={this.props.location.search.split('?page=')[1] || 1}
          showApprovedFlags
        />
      </div>
    );
  }
}

export default WordsByUser;
