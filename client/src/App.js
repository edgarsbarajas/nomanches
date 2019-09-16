import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home/Home';
import Add from './components/Add';
import WordsByUser from './components/WordsByUser';
import Nav from './components/nav/Nav';
import GlobalModal from './components/common/GlobalModal/GlobalModal';
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Nav />
            <GlobalModal />
            <div className='container'>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/add' component={Add}/>
                <Route path='/:username' component={WordsByUser}/>
              </Switch>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
