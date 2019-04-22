import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';


class App extends Component {
  render() {
    return (
      <div className="App">
        Hello, World!
        <Nav />
        <Register />
      </div>
    );
  }
}

export default App;
