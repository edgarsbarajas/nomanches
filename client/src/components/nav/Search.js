import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import SVG from '../common/SVG';

class Search extends Component {
  state = {
    searchValue: '',
    searchResults: [],
    searchResultsOpen: false,
    mousedownHappened: false
  };

  toggleSearchResults = () => {
    this.setState({ searchResultsOpen: !this.state.searchResultsOpen });
  }

  handleValueChange = event => {
    this.setState({ searchValue: event.target.value, searchResultsOpen: true }, () => {
      if(this.state.searchValue) {
        axios
          .get(`/words?potential_search=${this.state.searchValue}`)
          .then(response => {
            this.setState({searchResults: response.data});
          })
          .catch(error => {})
      }
    });
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    if(this.state.searchValue) {
      // window.location = `/words/${this.state.searchValue}`;
      // return <Redirect to={{ pathname: `/words/${this.state.searchValue}` }} />
    }
  }

  handleSearchResultClick = event => {
    this.setState({
      searchValue: event.target.href.split('/words/')[1].split('-').join(' '),
      mousedownHappened: false
    }, this.toggleSearchResults());
  }

  handleSearchResultMousedown = () => {
    this.setState({ mousedownHappened: true });
  }

  handleSearchOnFocus = () => {
    if(this.state.searchValue) {
      this.setState({ searchResultsOpen: true });
    }
  }

  handleSearchOnBlur = () => {
    if(!this.state.mousedownHappened) {
      this.setState({ searchResultsOpen: false });
    }
  }

  render() {
    const { searchValue, searchResults, searchResultsOpen } = this.state;
    const hasValidSearchResults = searchResults.length > 0 && searchValue;

    return (
      <div className='search p-r mr-l full'>
        <form className='full' onSubmit={this.handleSearchSubmit}>
          <input
            type='text'
            value={searchValue}
            onChange={this.handleValueChange}
            onFocus={this.handleSearchOnFocus}
            onBlur={this.handleSearchOnBlur}
            className='br fs-r pr-m pl-m pt-s pb-s bs-bb full'
          />
        <button className='bg-dark fc-light'>
          <SVG fill='#fff' width={20} viewBox='0 0 179.76 179.92' name='search' />
        </button>
      </form>
      {
        hasValidSearchResults && searchResultsOpen ? (
          <div className='p-a full br'>
            <ul className='search-results full bs-bb white-container'>
            {
              this.state.searchResults.map(result => {
                const searchValueIndex = result.indexOf(searchValue);
                const frontEnd = searchValueIndex !== 0 ? result.substr(0, searchValueIndex) : null;
                const backEnd = result.substr(searchValueIndex + searchValue.length, result.length - searchValue.length);

                return (
                  <li className='pl-s pr-s fs-r fw-r pt-s pb-s pl-m'>
                    <Link
                      to={`/words/${result.split(' ').join('-')}`}
                      className=''
                      onClick={this.handleSearchResultClick}
                      onMouseDown={this.handleSearchResultMousedown}
                    >
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
