import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import SVG from '../common/SVG';

class Search extends Component {
  state = {
    searchValue: '',
    searchResults: []
  };

  handleValueChange = event => {
    this.setState({ searchValue: event.target.value }, () => {
      axios
        .get(`/words?potential_search=${this.state.searchValue}`)
        .then(response => {
          this.setState({searchResults: response.data});
        })
        .catch(error => {})
    });

  }

  handleSearchSubmit = event => {
    event.preventDefault();

    alert(this.state.searchValue);
  }

  render() {
    const { searchValue, searchResults } = this.state;
    const hasValidSearchResults = searchResults.length > 0 && searchValue;

    return (
      <div className='search p-r mr-l full'>
        <form className='full' onSubmit={this.handleSearchSubmit}>
          <input
            type='text'
            value={this.state.value}
            onChange={this.handleValueChange}
            className='br fs-r pr-m pl-m pt-s pb-s bs-bb full'
          />
        <button className='bg-dark fc-light'>
          <SVG fill='#fff' width={20} viewBox='0 0 179.76 179.92' name='search' />
        </button>
      </form>
      {
        hasValidSearchResults ? (
          <div className='p-a full br'>
            <ul className='search-results full bs-bb white-container'>
            {
              this.state.searchResults.map(result => {
                const searchValueIndex = result.indexOf(searchValue);
                const frontEnd = searchValueIndex !== 0 ? result.substr(0, searchValueIndex) : null;
                const backEnd = result.substr(searchValueIndex + searchValue.length, result.length - searchValue.length);

                return (
                  <li className='pl-s pr-s fs-r fw-r pt-s pb-s pl-m'>
                    <Link to='/thebestever' className=''>
                      {frontEnd}
                      <b>{searchValue}</b>
                      {backEnd}
                    </Link>
                  </li>
                )
              })
            }
            </ul>
          </div>
        ) : null
      }
    </div>
    );
  }
}

export default Search;
