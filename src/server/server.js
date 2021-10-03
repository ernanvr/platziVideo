/* eslint-disable no-tabs */
/* eslint-disable global-require */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import express from 'express';
import { webpack } from 'webpack';
import dotenv from 'dotenv';
import serverRoutes from '../frontend/routes/serverRoutes';
import appState from '../frontend/reducers';
import { APIPopular, APITopRated } from '../frontend/utils/Vars';
import fetchState from './stateFetchingFunc';

//Configuring Environment Vars
dotenv.config();

const { ENV, PORT } = process.env;
const app = express();

//Charging middleware

if (ENV === 'development') {
  console.log('Development configuration');
  const webpackConfig = require('../../webpack.config.dev');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

const initialState = fetchState({
  chargeData: {
    popularMovies: APIPopular + process.env.APIKey,
    topMovies: APITopRated + process.env.APIKey,
  },
  setFavorite: {
    myList: '',
  },
  loginUser: {
    user: '',
  },
  playing: '',
});

const setResponse = (html) => {
  return (
    '<!DOCTYPE html>' +
			'<html lang="en">' +
			'<head>' +
				'<meta charset="UTF-8" />' +
				'<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
				'<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
				`<link
					rel="stylesheet"
					href="assets/app.css"
					type="text/css"
					media="screen"
					title="no title"
					charset="utf-8"
				/>` +
				'<title>Platzi Video</title>' +
			`</head>
				<body>
					<div id="App">${html}</div>
					<script src="assets/app.js" type="application/javascript"></script>
				</body>
			</html>`
  );
};

const renderApp = (req, res) => {
  const store = createStore(appState, initialState);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>,
  );

  res.send(setResponse(html));
};

app.get('*', renderApp);

app.listen(PORT, (err) => {

  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running in port ${PORT}`);
  }
});
