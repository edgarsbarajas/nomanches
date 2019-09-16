import React, { Component } from 'react';
import Pagination from '../common/Pagination';

class Home extends Component {
  render() {
    return (
      <div className='feed'>
        <Pagination
          query='/words/feed'
          currentPage={this.props.location.search.split('?page=')[1] || 1}
        />
      </div>
    );
  }
}

export default Home;
