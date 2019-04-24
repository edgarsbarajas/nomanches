import React, { Component } from 'react';
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
            <Link to='/register' onClick={this.toggleMenuModal}>register</Link>
            <Link to='/login' onClick={this.toggleMenuModal}>login</Link>
            <Link to='/' onClick={this.toggleMenuModal}>logout</Link>
            <button className='close-menu' onClick={this.toggleMenuModal}></button>
          </div>
        </div>
      );
    }
  }

  toggleMenuModal = () => {
    if(!this.state.menuOpen) {
      this.setState({ menuOpen: !this.state.menuOpen });
    } else {
      this.setState({ animateOut: true });

      setTimeout(() => {
        this.setState({ menuOpen: !this.state.menuOpen, animateOut: false });
      }, 500);
    }
  }

  render() {
    const { user, logoutUser } = this.props;

    return (
      <nav>
        <div className='nav-inner'>
          <Link to='/' className='logo'>spanglish dictionary</Link>
          <button className='hamburger' onClick={this.toggleMenuModal}></button>
        </div>
        { this.renderMenuModal() }
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser })(Nav);
