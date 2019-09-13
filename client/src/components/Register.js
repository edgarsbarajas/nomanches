import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { registerUser } from '../actions/AuthActions';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
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
    const { errors } = this.props;

    console.log(errors);

    return (
      <PostForm
        onSubmit={this.onSubmit}
        header='register'
        error={errors.register}
      >
        <Input
          type='text'
          name='firstName'
          label='first name'
          value={firstName}
          error={errors.first_name}
          onChange={this.onInputChange}
        />
        <Input
          type='text'
          name='lastName'
          label='last name'
          value={lastName}
          error={errors.last_name}
          onChange={this.onInputChange}
        />
        <Input
          type='email'
          name='email'
          label='e-mail'
          value={email}
          error={errors.email}
          onChange={this.onInputChange}
        />
        <Input
          type='text'
          name='username'
          label='username'
          value={username}
          error={errors.username}
          onChange={this.onInputChange}
        />
        <Input
          type='password'
          name='password'
          label='password'
          value={password}
          error={errors.password}
          onChange={this.onInputChange}
        />
        </PostForm>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.auth.registerErrors
});

export default connect(mapStateToProps, { registerUser })(Register);
