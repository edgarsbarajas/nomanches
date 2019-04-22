import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './common/Input';
import { registerUser } from '../actions/AuthActions';

class Register extends Component {
  state = {
    firstName: 'Edgar',
    lastName: 'Barajas',
    email: 'edgarsbarajas@me.com',
    username: 'escarvr00m',
    password: 'password'
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const { registerUser } = this.props;
    const { firstName, lastName, email, username, password } = this.state;

    event.preventDefault();

    registerUser({firstName, lastName, email, username, password});
  }

  render() {
    const { firstName, lastName, email, username, password } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Input
            type='text'
            name='firstName'
            value={firstName}
            onChange={this.onInputChange}
          />
          <Input
            type='text'
            name='lastName'
            value={lastName}
            onChange={this.onInputChange}
          />
          <Input
            type='email'
            name='email'
            value={email}
            onChange={this.onInputChange}
          />
          <Input
            type='text'
            name='username'
            value={username}
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

export default connect(null, { registerUser })(Register);
