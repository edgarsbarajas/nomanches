import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './common/Input';
import { loginUser } from '../actions/AuthActions';

class Login extends Component {
  state = {
    email: 'edgarsbarajas@yahoo.com',
    password: 'password'
  };

  onInputChange = event => {
    console.log('input changed');
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const { loginUser } = this.props;
    const { email, password } = this.state;

    event.preventDefault();

    loginUser({email, password});
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={this.onInputChange}
          />
          <Input
            type='password'
            name='password'
            value={password}
            onChange={this.onInputChange}
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { loginUser })(Login);
