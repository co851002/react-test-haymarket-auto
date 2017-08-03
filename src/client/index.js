import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Router, browserHistory } from 'react-router';
import * as reducers from 'reducers';
import routes from 'routes';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

//We expose the React Perf tool only in dev.
if (process.env.NODE_ENV !== 'production') {
  require('react-addons-perf');
}

const reducer = combineReducers(reducers);
const preloadedState = Object.assign({}, window.__REACT_REDUX_PAYLOAD__);
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store = { store }>
    <Router routes = { routes } history = { browserHistory } />
  </Provider>,
  document.getElementById('root')
);
