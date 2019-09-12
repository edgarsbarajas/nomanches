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
      .get('http://localhost:3001/words/feed/1')
      .then(response => this.setState({ feed: response.data }))
      .catch(error => console.log(error))
  }

  render() {
    const { feed } = this.state;
    console.log(feed);
    return (
      <div className='feed'>
        { feed.map(word => <Word key={word.id} word={word} />) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Feed)
