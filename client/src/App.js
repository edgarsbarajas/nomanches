import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/nav/Nav';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

export default App;
