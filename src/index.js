import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {  Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/index.js';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

const myStore = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={myStore}>
    <Router>
      <Switch>
        <App />
        <Redirect to="/login" />
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'));
