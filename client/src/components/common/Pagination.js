import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames'
import animateScrollTo from 'animated-scroll-to';
import Word from '../home/Word';
import LoadingScreen from './LoadingScreen';

class Pagination extends Component {
  state = {
    content: [],
    totalWordCount: null,
    lastPage: null,
    requestDone: false,
    loading: false
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    this.fetchWords();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.currentPage !== this.props.currentPage) {
      this.fetchWords();
    }

    if(prevProps.query !== this.props.query) {
      this.setState({ loading: true });
      this.fetchWords();
    }
  }

  fetchWords() {
    console.log(this.props.query);
    axios
      .get(`${this.props.query}/${this.props.currentPage}`)
      .then(response => {
        this.setState({
          content: response.data.words,
          totalWordCount: response.data.totalWordCount,
          lastPage: response.data.lastPage,
          requestDone: true,
          loading: false
        });
        animateScrollTo(0);
      })
      .catch(error => {
        this.setState({ requestDone: true, loading: false });
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

    return <h1 className='mb-l'>{ headline }</h1>;
  }

  render() {
    if(this.state.loading) return <LoadingScreen />

    if(this.state.content.length <= 0 && !this.state.requestDone) return null;
    if(this.state.content.length <= 0 && this.state.requestDone) return 'No results';

    return (
      <Fragment>
        { this.renderHeadline() }
        <div className='content w-100'>
          { this.state.content.map(word => <Word key={word._id} word={word} />) }
          <div>
            <div className='pagination white-container flex flex-row jc-c ai-c p-a'>
              <Link
                to={`?page=${parseInt(this.props.currentPage) - 1}`}
                className={classnames('arrow', {
                  'inactive-link': this.props.currentPage == 1
                })}>
                  {'<'}
              </Link>
              <span className='pipes'></span>
              <div className='pages'>
                { this.props.currentPage } of { this.state.lastPage }
              </div>
              <span className='pipes'></span>
              <Link
                to={`?page=${parseInt(this.props.currentPage) + 1}`}
                className={classnames('arrow', {
                  'inactive-link': this.props.currentPage == this.state.lastPage
                })}
                name='right'>
                  {'>'}
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Pagination;
