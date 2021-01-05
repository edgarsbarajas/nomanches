import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import MainContainer from '../common/MainContainer';
import './Word.css';
import VoteSection from './VoteSection';
import CommentSection from './CommentSection';
import SVG from '../common/SVG';

class Word extends Component {
  state = {
    word: this.props.word
  };

  componentDidMount() {
    
  }

  onVoteSuccess = word => {
    this.setState({ word });
  }

  render() {
    const { word } = this.state;
    const { votes } = word;
    const { user, showApprovedFlags } = this.props;

    return (
      <MainContainer classNames='word mb-l lowercase relative'>
        <h2 className='w-fc d-ib bg-dark fs-m fc-light mb-s pt-s pb-s pr-l pl-l'>{word.value}</h2>
        <p className='definition fs-r mt-m mb-m'>{word.definition}</p>
        <p className='example fs-r italic mt-m mb-m'>{word.example}</p>
        <div className='publish-details fs-r mt-m mb-m'>
          <p>
            by <Link to={`/${word.user.username}`} className='author d-ib fw-b fc-dark'> {word.user.username}</Link> <span className='bullet'></span> {moment(word.createdAt).format('MMMM Do, YYYY')}
          </p>
        </div>
        <VoteSection
          word={word}
          onVoteSuccess={this.onVoteSuccess}
        />
        <CommentSection />
        {
          showApprovedFlags && (
            (user && (user.id === word.user._id)) && (
              <div className={classNames('flag', {
                'approved': word.approved
              })}>
                {word.approved && <span>appproved</span>}
              </div>
            )
          )
        }
        
    </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Word)
