import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames'
import animateScrollTo from 'animated-scroll-to';
import Word from '../home/Word';

class Pagination extends Component {
  state = {
    content: [],
    totalWordCount: null,
    lastPage: null,
    requestDone: false
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
          totalWordCount: response.data.totalWordCount,
          lastPage: response.data.lastPage,
          requestDone: true
        });
        animateScrollTo(0);
      })
      .catch(error => {
        this.setState({ requestDone: true });
        console.log(error.response)
    })
  }

  renderHeadline() {
    let { headline } = this.props;

    if(!headline) return null;

    if(headline.includes('[word count]')) {
      headline = headline.replace('[word count]', this.state.totalWordCount);
      if(this.state.totalWordCount === 1) {
        headline = headline.replace('definitions', 'defintion');
      }
    }

    return <h1>{ headline }</h1>;
  }

  render() {
    if(this.state.content.length <= 0 && !this.state.requestDone) return null;
    if(this.state.content.length <= 0 && this.state.requestDone) return 'No results';

    return (
      <Fragment>
        { this.renderHeadline() }
        <div className='content'>
          { this.state.content.map(word => <Word key={word._id} word={word} />) }
          <div className='pagination' style={styles.container}>
            <div className='white-container' style={styles.pageNumbers}>
              <Link
                to={`?page=${parseInt(this.props.currentPage) - 1}`}
                className={classnames('arrow', {
                  'inactive-link': this.props.currentPage == 1
                })}
                style={styles.arrows}>
                  {'<'}
              </Link>
              <span className='pipe' style={styles.pipes}></span>
              <div className='pages'>
                { this.props.currentPage } of { this.state.lastPage }
              </div>
              <span className='pipe' style={styles.pipes}></span>
              <Link
                to={`?page=${parseInt(this.props.currentPage) + 1}`}
                className={classnames('arrow', {
                  'inactive-link': this.props.currentPage == this.state.lastPage
                })}
                name='right'
                style={styles.arrows}>
                  {'>'}
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
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
