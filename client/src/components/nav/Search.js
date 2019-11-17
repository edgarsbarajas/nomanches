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
    mousedownHappened: false,
    redirect: false
  };

  toggleSearchResults = () => {
    this.setState({ searchResultsOpen: !this.state.searchResultsOpen });
  }

  fetchSearchResults = () => {
    axios
      .get(`/words?potential_search=${this.state.searchValue}`)
      .then(response => {
        this.setState({ searchResults: response.data });
      })
      .catch(error => {})
  }

  handleValueChange = event => {
    this.setState({ searchValue: event.target.value.toLowerCase(), searchResultsOpen: true }, () => {
      if(this.state.searchValue) {
        this.fetchSearchResults();
      }
    });
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    if(this.state.searchValue) {
      this.setState({ redirect: true }, () => this.setState({ redirect: false }));
      this.handleSearchOnBlur();
    }
  }

  handleSearchResultClick = (event, searchValue) => {
    this.setState({
      searchValue,
      mousedownHappened: false
    }, () => {
      this.toggleSearchResults();
      this.fetchSearchResults();
    });
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

  renderSearchResults = () => {
    const { searchValue, searchResults, searchResultsOpen } = this.state;
    const hasValidSearchResults = searchResults.length > 0 && searchValue;
    let searchValueIndex;
    let frontEnd;
    let backEnd;

    if(hasValidSearchResults && searchResultsOpen) {
      return (
        <div className='p-a full br'>
          <ul className='search-results full bs-bb white-container'>
          {
            this.state.searchResults.map(result => {
              searchValueIndex = result.indexOf(searchValue);
              frontEnd = searchValueIndex !== 0 ? result.substr(0, searchValueIndex) : null;
              backEnd = result.substr(searchValueIndex + searchValue.length, result.length - searchValue.length);

              return (
                <li className='pl-s pr-s fs-r fw-r pt-s pb-s pl-m' key={result}>
                  <Link
                    to={`/words/${result.split(' ').join('-')}`}
                    className=''
                    onClick={event => this.handleSearchResultClick(event, result)}
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
      )
    }
  }

  render() {
    return (
      <div className='search p-r mr-l full'>
        { this.state.redirect && <Redirect to={`/words/${this.state.searchValue.trim()}`} /> }
        <form className='full' onSubmit={this.handleSearchSubmit}>
          <input
            type='text'
            value={this.state.searchValue}
            onChange={this.handleValueChange}
            onFocus={this.handleSearchOnFocus}
            onBlur={this.handleSearchOnBlur}
            className='br fs-r pr-m pl-m pt-s pb-s bs-bb full'
          />
        <button className='bg-dark fc-light'>
          <SVG fill='#fff' width={20} viewBox='0 0 179.76 179.92' name='search' />
        </button>
      </form>
      { this.renderSearchResults() }
    </div>
    );
  }
}

export default Search;
