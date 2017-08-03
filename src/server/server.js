import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { RouterContext, match} from 'react-router';
import rootSaga from 'sagas';
import { ports } from '../../config/app.conf.js';
// API routes for different API endpoints.
import applyApi from 'server/api';
import routes from 'routes';
import * as reducers from 'reducers';
import 'fetch-everywhere';
import template from './template.js';

//translate sccs variables files into JSON. You get a JSON like: { 'variableName' : 'variableValue'}, just access the value: scssJson.variableName

const assets = JSON.parse(fs.readFileSync('./build/assets.json', { encoding: 'utf8' }));

const port = (typeof ports[process.env.APP_ENV] === 'number' && ports[process.env.APP_ENV]) || ports.default;
// Proxy the fetch command to the server due to server side needing absolute paths.
const oldFetch = global.fetch;
const serverProxyEndpoint = typeof process.env.SERVER_PROXY === 'string' ? process.env.SERVER_PROXY : ('http://localhost:' + port);
global.fetch = function(endpoint, ...args) {
  return oldFetch(serverProxyEndpoint + endpoint, ...args);
};

const server = express();
server.use('/', express.static('build'));
applyApi(server);
server.use((req, res) => {
  match({routes: routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if(renderProps) {
      const reducer = combineReducers(reducers);
      const sagaMiddleware = createSagaMiddleware();
      const store = createStore(reducer, applyMiddleware(sagaMiddleware));
      const html = <Provider store = { store }><RouterContext { ...renderProps } /></Provider>;
      sagaMiddleware.run(rootSaga).done.then(() => {
        res
          .status(200)
          .send(template(renderToString(html), assets['js'], assets['css'], '', store.getState()));
      });
      renderToString(html);
      store.dispatch(END);
    }
    else {
      res.status(404).send('Page not found');
    }
  });
});

server.listen(port);
