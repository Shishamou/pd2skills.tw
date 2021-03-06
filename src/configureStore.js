import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

import * as app from './actions/app';
import hashMiddleware from './hashMiddleware';

export default function configureStore(source) {
  const loggerMiddleware = createLogger();

  var middlewares = [
    thunkMiddleware,
    hashMiddleware,
    // loggerMiddleware
  ];
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

  const store = createStoreWithMiddleware(rootReducer);

  store.dispatch(app.initialize(source));

  return store;
}
