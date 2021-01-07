import React, { Component } from 'react';
import Pagination from './common/Pagination';

class WordsByValue extends Component {
  render() {
    alert();
    const dashedValue = this.props.location.pathname.replace('/words/', '');
    const value = dashedValue.split('-').join(' ');

    console.log(dashedValue, " ", value);

    return (
      <div className='feed'>
        <Pagination
          headline={`[word count] definitions for ${value}`}
          query={`/words/value/${value}/page/`}
          currentPage={this.props.location.search.split('?page=')[1] || 1}
        />
      </div>
    );
  }
}

export default WordsByValue;
