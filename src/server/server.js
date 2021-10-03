/* eslint-disable no-tabs */
/* eslint-disable global-require */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import express from 'express';
import helmet from 'helmet';
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
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'https://image.tmdb.org'],
      'script-src': [
        "'self'",
        "'sha256-uulKwzkGi5fodj0AB03qg3pOLGjZf4S9bMfBwFJSz/k='",
        "'sha256-5szVvYVG/ApgdwJY5gIRtwSrKx1kvDIY53uE1OFrw9U='",
      ],
      'style-src-elem': ["'self'", 'https://fonts.googleapis.com'],
      'font-src': ["'self'", 'https://fonts.gstatic.com/'],
      'connect-src': ["'self'", 'https://api.themoviedb.org'],
      'frame-src': ["'self'", 'https://www.youtube.com/'],
    },
  }));
  app.disable('x-powered-by');
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

const setResponse = (html, preloadedState) => {
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
          <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
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

  const preloadedState = store.getState();

  res.send(setResponse(html, preloadedState));
};

app.get('*', renderApp);

app.listen(PORT, (err) => {

  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running in port ${PORT}`);
  }
});
