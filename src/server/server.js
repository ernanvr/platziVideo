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
import getManifest from './getManifest';

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
  app.use((req, res, next) => {
    if (!req.hashManifest) {
      req.hashManifest = getManifest();
    }
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'https://image.tmdb.org'],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
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

const setResponse = (html, preloadedState, manifest) => {
  const mainStyle = manifest ? manifest['vendors.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (
    '<!DOCTYPE html>' +
			'<html lang="en">' +
			'<head>' +
				'<meta charset="UTF-8" />' +
				'<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
				'<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
				`<link
					rel="stylesheet"
					href="${mainStyle}"
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
					<script src="${mainBuild}" type="application/javascript"></script>
					<script src="${vendorBuild}" type="application/javascript"></script>
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

  res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.get('*', renderApp);

app.listen(PORT, (err) => {

  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running in port ${PORT}`);
  }
});
