import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import MainContainer from './common/MainContainer';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { handleAuthSuccess } from '../actions/AuthActions';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    errors: {},
    redirect: false
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();
    const { firstName, lastName, email, username, password } = this.state;

    axios
      .post('/users', {
          firstName,
          lastName,
          email,
          username,
          password
        }
      )
      .then(response => {
        // Set the new user in redux, auth header, etc.
        this.props.handleAuthSuccess(response.data)

        // Redirect to the homepage
        this.setState({ redirect: true });
      })
      .catch(error => this.setState({ errors: error.response.data.errors }))
  }

  render() {
    const { firstName, lastName, email, username, password, errors, redirect } = this.state;

    if(redirect) return <Redirect to='/' />;

    return (
    <MainContainer classNames='form-container fixed-width tall'>
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
            error={errors.firstName}
            onChange={this.onInputChange}
          />
          <Input
            type='text'
            name='lastName'
            label='last name'
            value={lastName}
            error={errors.lastName}
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
        <Link to='/login' className='sub-message'>already have an account? <span>sign in</span></Link>
        </PostForm>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.auth.registerErrors
});

export default connect(mapStateToProps, { handleAuthSuccess })(Register);
