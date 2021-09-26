/* eslint-disable no-tabs */
/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { webpack } from 'webpack';
import dotenv from 'dotenv';
import https from 'https';
import appState from '../frontend/reducers/index';
import { APIPopular, APITopRated, APIKey } from '../frontend/utils/Vars';

dotenv.config();

const { ENV, PORT } = process.env;
const app = express();

if (ENV === 'development') {
  console.log('Development configuration');
  const webpackConfig = require('../../webpack.config.dev');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

const url = [APIPopular, APITopRated];
const data = [];

for (let i = 0, len = url.length; i < len; i++) {
  https.get(url[i], (resp) => {
    let dataResult = '';

    resp.on('data', (chunk) => {
      dataResult += chunk;
    });

    resp.on('end', () => {
      data[i] = JSON.parse(dataResult);
    });

    //resp.on('error', (err) => {
    //console.log(`Error ${err.message}`);
    //});
  });
}

app.get('*', (req, res) => {
  res.send(
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
					<div id="App"></div>
					<script src="assets/app.js" type="application/javascript"></script>
				</body>
			</html>`,
  );
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running in port ${PORT}`);
  }
});
