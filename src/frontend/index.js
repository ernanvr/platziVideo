import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import reduxThunk from 'redux-thunk';
import appState from './reducers';
import App from './routes/App';

const initialState = {
  chargeData: {
    popularMovies: [],
    topMovies: [],
  },
  setFavorite: {
    myList: [],
  },
  loginUser: {
    user: [],
  },
  playing: {},
};

const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appState, initialState, composeEnhancer(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('App'),
);

