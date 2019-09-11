import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { loginUser } from '../actions/AuthActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
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
    const { errors } = this.props;

    return (
      <PostForm
        onSubmit={this.onSubmit}
        header='login'
        error={errors.login}
      >
        <Input
          type='email'
          name='email'
          label='e-mail'
          value={email}
          error={errors.email}
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
  errors: state.auth.loginErrors
});

export default connect(mapStateToProps, { loginUser })(Login);
