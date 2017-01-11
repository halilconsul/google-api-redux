import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

const middleware = applyMiddleware(promise(), logger(), thunk);

export default createStore(rootReducer, middleware);
