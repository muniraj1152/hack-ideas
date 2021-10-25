import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/home/Home';
import Header from './components/header/Header';

import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
