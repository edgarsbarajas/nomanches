import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

class Nav extends Component {
  state = {

  };

  render() {
    const { user } = this.props;

    console.log('USER!!!', user);

    return (
      <nav>
        {
          isEmpty(user) ? (<button>Login</button>) : (<button>Logout</button>)
        }
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Nav);
