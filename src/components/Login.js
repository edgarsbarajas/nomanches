import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { loginUser } from '../actions/AuthActions';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;

    loginUser({username, password});
  }

  render() {
    const { username, password } = this.state;
    const { errors } = this.props;

    return (
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
      </PostForm>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.auth.loginErrors
});

export default connect(mapStateToProps, { loginUser })(Login);
