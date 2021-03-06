import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import axios from 'axios';
import { logoutUser } from '../../actions/AuthActions';
import { setGlobalModalComponent } from '../../actions/GlobalModalActions';

class VoteIcon extends Component {
  onVoteOptionClick = () => {
    // If user is a GUEST
    if(Object.keys(this.props.user).length === 0) {
      console.log("Do some guest shit");

    } else {
      axios
        .post(`/votes/word/${this.props.wordId}`, {
          upvote: this.props.upvote
        })
        .then(response => this.props.onVoteSuccess(response.data))
        .catch(error => {
          // if there is an error, open a modal to login
          if(error.response.data.token) {
            this.props.logoutUser();
            this.props.setGlobalModalComponent('Login');
          }
        })
    }
  }

  render() {
    const { fill='#000', upvote } = this.props;

    return (
      <svg
        onClick={this.onVoteOptionClick}
        className={classNames('vote', {
          'downvote mr-m ml-s': !upvote,
          'ml-m' : upvote
        })}
        fill={fill}
        height="35"
        width="35"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
      >
        <g id="mrxzcw">
          <path d="M279.79-.15c6.23,0.76,12.49,1.3,18.68,2.3,36.79,6,59.06,29.48,64.33,66.18,4,28.15,1.58,55.12-10.49,81a43.41,43.41,0,0,0-1.37,4.12c2.46,0.17,4.44.39,6.43,0.42,17.52,0.29,35,.35,52.55.87,19.9,0.6,36,9.65,49.18,23.94,24.53,26.69,28,61.15,9.75,94.32-2.19,4-3.18,7.54-2.28,12.31,3.48,18.45.76,36.19-7.43,53.15a19,19,0,0,0-1.8,9c1.26,21.68-3,41.75-15.91,59.68-1.55,2.16-1.9,5.55-1.94,8.39-0.61,44.47-34,79.22-78.42,82.92-59.7,5-117.22-3.41-173.16-24.62-13.85-5.25-28.4-8.66-42.68-12.71-2.46-.7-5.21-0.5-7.83-0.51-27.7-.09-55.41.07-83.11-0.26-16.87-.2-32.53-15.28-34.16-32.15-0.25-2.61-.45-5.25-0.46-7.87q0-93.63-.07-187.27c0-16.64,6.52-29.3,21.63-36.59a38.32,38.32,0,0,1,15.63-3.61c25.42-.37,50.85-0.31,76.27-0.06,5.16,0,9.25-1.19,12.55-5,11.51-13.42,23.1-26.79,34.5-40.31,9.82-11.66,19-23.86,29.27-35.13,8-8.79,12.43-18.78,14.89-30.14,2.92-13.49,5.77-27,9.74-40.25,4.8-16,12.8-30.15,28.65-37.81,4.6-2.22,9.95-2.89,15-4.27h2.1ZM422.63,270.38c3.46-3.29,8.22-6.1,10.4-10.26a99.83,99.83,0,0,0,8.83-23.37c2.32-9.93-.23-19.33-6.42-27.77-9-12.35-21.08-17.53-36.23-17.39-31.21.29-62.42,0.09-93.63,0-6.45,0-7-.67-6.52-7a13.52,13.52,0,0,1,.59-3.61c5.12-13.93,9.62-28.13,15.61-41.68,9.48-21.46,14.86-43.1,10.18-66.78-3.81-19.29-12.28-30.18-29.62-33-19-3.06-19.69-4.93-26.83,16.29C265.62,66,264,76.64,261.52,87c-4.2,17.68-9.7,34.58-22.53,48.44-10.1,10.91-19.36,22.65-28.54,34.36-13.63,17.38-26.73,35.2-43.83,49.5-7.39,6.19-15.17,11.18-25.45,10.74-6.92-.29-6.95,0-7,6.8q0,89.68,0,179.37c0,1.05.08,2.11,0,3.16-0.18,2.6.8,3.86,3.6,3.8,17.86-.37,34.51,5,51,11,36.62,13.18,73.45,25.84,112.79,27.15a452.13,452.13,0,0,0,61.86-1.73c17.91-1.87,31.65-12,36-30.57,2.08-8.83,1.51-18.32,1.86-27.52,0.13-3.42-.92-6.51,2.65-9.35,14.3-11.39,20.06-33.26,13.23-50.48-1.74-4.38-1.33-7.11,1.76-10.64,9.91-11.36,13.83-24.72,10.5-39.54C427.83,284.08,424.82,277,422.63,270.38Z"/>
        </g>
      </svg>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { setGlobalModalComponent, logoutUser })(VoteIcon);
