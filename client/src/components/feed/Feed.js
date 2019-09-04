import React, { Component } from 'react';
import { connect } from 'react-redux';
import Word from './Word';
import { fetchFeed } from '../../actions/WordActions';

class Feed extends Component {
  componentDidMount() {
    this.props.fetchFeed();
  }

  render() {
    const { feed, user } = this.props;
    console.log(feed);
    return (
      <div className='feed'>
        { feed.map(word => <Word key={word.id} word={word} />) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.words.feed,
  user: state.auth.user
});

export default connect(mapStateToProps, { fetchFeed })(Feed)
