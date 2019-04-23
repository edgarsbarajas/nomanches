import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import Add from './components/Add';
import Nav from './components/nav/Nav';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Feed}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/add' component={Add}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
