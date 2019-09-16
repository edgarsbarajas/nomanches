import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import animateScrollTo from 'animated-scroll-to';
import Word from '../feed/Word';

class Pagination extends Component {
  state = {
    content: [],
    lastPage: null
  };

  componentDidMount = () => {
    this.fetchWords();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.currentPage !== this.props.currentPage) {
      this.fetchWords();
    }
  }

  fetchWords() {
    axios
      .get(`${this.props.query}/${this.props.currentPage}`)
      .then(response => {
        this.setState({
          content: response.data.words,
          lastPage: response.data.lastPage
        });
        animateScrollTo(0);
      })
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
      <div className='content'>
        { this.state.content.map(word => <Word key={word._id} word={word} />) }
        <div className='pagination' style={styles.container}>
          <div className='white-container' style={styles.pageNumbers}>
            <Link to={`/?page=${parseInt(this.props.currentPage) - 1}`} className='arrow' style={styles.arrows}>{'<'}</Link>
            <span className='pipe' style={styles.pipes}></span>
            <div className='pages'>
              { this.props.currentPage } of { this.state.lastPage }
            </div>
            <span className='pipe' style={styles.pipes}></span>
            <Link to={`/?page=${parseInt(this.props.currentPage) + 1}`} className='arrow' style={styles.arrows}>{'>'}</Link>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  pageNumbers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 18px',
    borderRadius: '1000px'
  },
  arrows: {},
  pipes: {
    width: '1px',
    height: '100%',
    backgroundColor: '#e9e9e9',
    margin: '0 15px'
  }
}

export default Pagination;
