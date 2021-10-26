import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/home/Home';
import Header from './components/header/Header';
import Login from './containers/login/Login';

import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
