import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './common/Input';
import { onInputChange } from '../actions/LoginActions';

class Login extends Component {
  render() {
    const { email, password, onInputChange } = this.props;

    return (
      <div>
        <form>
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

export default connect(mapStateToProps, { onInputChange })(Login);
