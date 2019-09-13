import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { logoutUser } from '../../actions/AuthActions';
import './Nav.css';

class Nav extends Component {
  state = {
    menuOpen: false,
    animateOut: false
  };

  renderMenuModal() {
    if(this.state.menuOpen) {
      return (
        <div className={classNames('menu-container', {
            'shine-in': this.state.menuOpen,
            'shine-out': this.state.animateOut
          })}>
          <div className='menu'>
            <Link to='/add' onClick={this.toggleMenuModal}>add a word</Link>
            { this.renderMenuModalAuthOptions() }
            <button className='close-menu' onClick={this.toggleMenuModal}></button>
          </div>
        </div>
      );
    }
  }

  renderMenuModalAuthOptions() {
    if(isEmpty(this.props.user)) {
      return (
        <div>
          <Link to='/register' onClick={this.toggleMenuModal}>register</Link>
          <Link to='/login' onClick={this.toggleMenuModal}>login</Link>
        </div>
      );
    }

    return (
      <Link to='/' onClick={this.onLogoutClick}>logout</Link>
    );
  }

  onLogoutClick = () => {
    this.toggleMenuModal();

    setTimeout(() => {
      this.props.logoutUser();
    }, 500);
  }

  toggleMenuModal = () => {
    if(!this.state.menuOpen) {
      this.setState({ menuOpen: !this.state.menuOpen });
    } else {
      this.setState({ animateOut: true });

      setTimeout(() => {
        this.setState({ animateOut: false, menuOpen: !this.state.menuOpen });
      }, 450);
    }
  }

  render() {
    return (
      <Fragment>
        <nav>
          <div className='nav-inner'>
            <Link to='/' className='logo'>spanglish dictionary</Link>
            <button className='hamburger' onClick={this.toggleMenuModal}></button>
          </div>
        </nav>
        { this.renderMenuModal() }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser })(Nav);
