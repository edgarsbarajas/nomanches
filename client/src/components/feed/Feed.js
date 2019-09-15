import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Word from './Word';
import BottomScrollListener from 'react-bottom-scroll-listener';

class Feed extends Component {
  state = {
    feed: [],
    page: 1
  };

  componentDidMount() {
    this.fetchWords();
  }

  fetchWords() {
    axios
      .get(`/words/feed/${this.state.page}`)
      .then(response => this.setState({ feed: [...this.state.feed, ...response.data] }))
      .catch(error => console.log(error))
  }

  hasReachedBottom = () => {
    // Increase the page number and fetch the new batch of words
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchWords();
    })
  }

  render() {
    if(this.state.feed.length <= 0) return null;

    return (
      <div className='feed'>
        <BottomScrollListener onBottom={this.hasReachedBottom} />
        { this.state.feed.map(word => <Word key={word._id} word={word} />) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Feed)
