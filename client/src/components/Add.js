import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './common/Input';
import { loginUser } from '../actions/AuthActions';

class Add extends Component {
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
        New word form
      </div>
    )
  }
}

export default connect(null, { loginUser })(Add);
