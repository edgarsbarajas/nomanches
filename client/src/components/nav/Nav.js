import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { setGlobalModalComponent } from '../../actions/GlobalModalActions';
import Search from './Search';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <Fragment>
        <nav>
          <div className='nav-inner'>
            <Link to='/' className='logo'>¡nm!</Link>
            <div className='right-nav flex ai-c'>
              <Search />
              <button className='hamburger' onClick={() => this.props.setGlobalModalComponent('NavMenu')}></button>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default connect(null, { setGlobalModalComponent })(Nav);
