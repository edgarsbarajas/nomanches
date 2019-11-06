import React, { Component } from 'react';
import SVG from '../common/SVG';

class Search extends Component {
  state = {
    searchValue: ''
  };

  handleValueChange = event => {
    this.setState({ searchValue: event.target.value });
  }

  handleSearchSubmit = event => {
    event.preventDefault();

    alert(this.state.searchValue);
  }

  render() {
    return (
      <form className='search mr-l full' onSubmit={this.handleSearchSubmit}>
        <input
          type='text'
          value={this.state.value}
          onChange={this.handleValueChange}
          className='br fs-r pr-m pl-m pt-s pb-s full'
        />
      <button className='bg-dark fc-light'>
        <SVG fill='#fff' width={20} viewBox='0 0 179.76 179.92' name='search' />
      </button>
    </form>
    );
  }
}

export default Search;
