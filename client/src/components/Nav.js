import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { logoutUser } from '../actions/AuthActions';

class Nav extends Component {
  state = {

  };

  render() {
    const { user, logoutUser } = this.props;

    console.log('USER!!!', user);

    return (
      <nav>
        {
          isEmpty(user) ? (<button>Login</button>) : (<button onClick={logoutUser}>Logout</button>)
        }
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser })(Nav);
