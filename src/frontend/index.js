import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import reduxThunk from 'redux-thunk';
import appState from './reducers';
import App from './routes/App';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appState, preloadedState, composeEnhancer(applyMiddleware(reduxThunk)));

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('App'),
);

