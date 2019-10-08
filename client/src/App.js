import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home/Home';
import Add from './components/Add';
import WordsByUser from './components/WordsByUser';
import Nav from './components/nav/Nav';
import GlobalModal from './components/common/GlobalModal/GlobalModal';
import PrivateRoute from './components/PrivateRoute';
import './App.css';


class App extends Component {
  userIsLoggedIn() {
    return Object.keys(store.getState().auth.user).length > 0;
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Nav />
          <GlobalModal />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <PrivateRoute
                path='/login'
                exact
                component={Login}
                isAuthenticated={() => !this.userIsLoggedIn()}
                redirectTo='/'
              />
              <PrivateRoute
                path='/register'
                exact
                component={Register}
                isAuthenticated={() => !this.userIsLoggedIn()}
                redirectTo='/'
              />
              <PrivateRoute
                path='/add'
                exact
                component={Add}
                isAuthenticated={this.userIsLoggedIn}
                redirectTo='/login?redirect=true'
              />
              <Route path='/:username' component={WordsByUser} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
