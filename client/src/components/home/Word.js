import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Word.css';
import VoteSection from './VoteSection';

class Word extends Component {
  state = {
    word: this.props.word
  };

  onVoteSuccess = word => {
    this.setState({ word });
  }

  render() {
    const { word } = this.state;
    const { votes } = word;

    return (
      <div className='word white-container'>
        <h2>{word.value}</h2>
        <p className='definition'>{word.definition}</p>
        <p className='example'>{word.example}</p>
        <div className='publish-details'>
          <p>
            by <Link to={`/${word.user.username}`} className='author'> {word.user.username}</Link> <span className='bullet'></span> {moment(word.createdAt).format('MMMM Do, YYYY')}
          </p>
        </div>
        <VoteSection
          word={word}
          onVoteSuccess={this.onVoteSuccess}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Word)
