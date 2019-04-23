import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { logoutUser } from '../../actions/AuthActions';
import './Nav.css';

class Nav extends Component {
  state = {
    menuOpen: false
  };

  renderMenuModal() {
    if(this.state.menuOpen) {
      return (
        <div className='menu-container'>
          <div className='menu'>
            <div>Add a word</div>
            <button className='close-menu' onClick={this.toggleMenuModal}></button>
          </div>
        </div>
      );
    }

    return null;
  }

  toggleMenuModal = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { user, logoutUser } = this.props;

    return (
      <nav>
        <div className='nav-inner'>
          <div className='logo'>spanglish dictionary</div>
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
