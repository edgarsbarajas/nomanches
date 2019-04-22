import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './common/Input';
import { onInputChange, loginUser } from '../actions/AuthActions';

class Login extends Component {
  render() {
    const { email, password, onInputChange, loginUser } = this.props;

    return (
      <div>
        <form onSubmit={loginUser({email, password})}>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={onInputChange}
          />
          <Input
            type='password'
            name='password'
            value={password}
            onChange={onInputChange}
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.login.email,
    password: state.login.password
  }
}

export default connect(mapStateToProps, { onInputChange, loginUser })(Login);
