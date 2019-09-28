import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../common/Pagination';

class Home extends Component {
  render() {
    return (
      <div className='feed flex fd-r w-100'>
        <Pagination
          headline=''
          query='/words/feed'
          currentPage={this.props.location.search.split('?page=')[1] || 1}
        />
      <div className='sidebar'>
        <div className='bg-dark p-l br'>
          <span className='d-b fc-light fs-l'>comparte</span>
          <span className='d-b fc-light fs-l'>palabras</span>
          <span className='d-b fc-light fs-l'>con</span>
          <span className='d-b fc-light fs-l fw-b'>el mundo</span>
          <Link to='/add' className='cta button-light mt-l'>agregar</Link>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
