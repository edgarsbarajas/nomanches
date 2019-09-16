import React, { Component } from 'react';
import Pagination from './common/Pagination';

class WordsByUser extends Component {
  render() {
    const username = this.props.location.pathname.replace('/', '');
    return (
      <div className='feed'>
        <Pagination
          headline={`[word count] definitions by ${username}`}
          query={`/words/user/${username}`}
          currentPage={this.props.location.search.split('?page=')[1] || 1}
        />
      </div>
    );
  }
}

export default WordsByUser;
