import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Word from '../feed/Word';
import BottomScrollListener from 'react-bottom-scroll-listener';

class InfiniteScroll extends Component {
  state = {
    content: [],
    page: 1
  };

  componentDidMount() {
    console.log('wtf');
    this.fetchWords();
  }

  fetchWords() {
    axios
      .get(`${this.props.url}/${this.state.page}`)
      .then(response => this.setState({ content: [...this.state.content, ...response.data] }))
      .catch(error => console.log(error.response))
  }

  hasReachedBottom = () => {
    // Increase the page number and fetch the new batch of words
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchWords();
    })
  }

  render() {
    if(this.state.content.length <= 0) return null;

    return (
      <div className='infinite-scroll'>
        <BottomScrollListener onBottom={this.hasReachedBottom} />
        { this.state.content.map(word => <Word key={word._id} word={word} />) }
      </div>
    );
  }
}

export default InfiniteScroll;
