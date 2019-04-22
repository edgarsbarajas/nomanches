import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello, World!
        <Login />
      </div>
    );
  }
}

export default App;
