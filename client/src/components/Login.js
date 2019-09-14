import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { loginUser } from '../actions/AuthActions';
import { setGlobalModalComponent } from '../actions/GlobalModalActions';

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
        <Link
          to='/register'
          className='sub-message'
          onClick={() => this.props.setGlobalModalComponent(null)}
        >
          new to no manches? <span>sign up</span>
        </Link>
      </PostForm>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.auth.loginErrors
});

export default connect(mapStateToProps, { loginUser, setGlobalModalComponent })(Login);
