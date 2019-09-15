import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Word from './Word';
import InfiniteScroll from '../common/InfiniteScroll';

class Feed extends Component {
  render() {
    return (
      <div className='feed'>
        <InfiniteScroll
          url='/words/feed'
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Feed)
