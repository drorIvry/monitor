import {createStore} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import {applyMiddleware} from 'redux';
import promiseMiddleware  from 'redux-promise-middleware';

export default createStore(
    reducers,
    applyMiddleware(logger, promiseMiddleware),
);