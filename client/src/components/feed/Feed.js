import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Word from './Word';

// COOL TO HAVE: global error box modal
class Feed extends Component {
  state = {
    feed: []
  };
  componentDidMount() {
    axios
      .get('/words/feed/1')
      .then(response => this.setState({ feed: response.data }))
      .catch(error => console.log(error))
  }

  render() {
    if(this.state.feed.length <= 0) return null;

    return (
      <div className='feed'>
        { this.state.feed.map(word => <Word key={word._id} word={word} />) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Feed)
