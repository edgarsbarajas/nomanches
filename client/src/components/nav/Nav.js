import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { setGlobalModalComponent } from '../../actions/GlobalModalActions';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <Fragment>
        <nav>
          <div className='nav-inner'>
            <Link to='/' className='logo'>¡no manches!</Link>
            <button className='hamburger' onClick={() => this.props.setGlobalModalComponent('NavMenu')}></button>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default connect(null, { setGlobalModalComponent })(Nav);
