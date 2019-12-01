import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import MainContainer from './common/MainContainer';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { handleAuthSuccess } from '../actions/AuthActions';
import { setGlobalModalComponent } from '../actions/GlobalModalActions';

class Login extends Component {
  state = {
    username: 'thebestever',
    password: 'babycakes1',
    errors: {},
    redirect: false
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;

    axios
      .post('/auth/login', {
        username, password
      })
      .then(response => {
        // Set the new user in redux, auth header, etc.
        this.props.handleAuthSuccess(response.data)

        // Redirect to the homepage
        this.setState({ redirect: true });
      })
      .catch(error => this.setState({ errors: error.response.data }))
  }

  render() {
    const { username, password, errors, redirect } = this.state;

    if(redirect) return <Redirect to='/' />;

    return (
      <MainContainer classNames='form-container fixed-width ai-c tall'>
        <PostForm
          onSubmit={this.onSubmit}
          header='login'
          error={errors.login}
        >
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
          <Link
            to='/register'
            className='sub-message'
            onClick={() => this.props.setGlobalModalComponent(null)}
          >
            new to no manches? <span>sign up</span>
          </Link>
        </PostForm>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.auth.loginErrors
});

export default connect(mapStateToProps, { setGlobalModalComponent, handleAuthSuccess })(Login);
