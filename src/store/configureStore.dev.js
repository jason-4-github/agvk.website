import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const configureStore = (preloadedState) => {

  const middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  const store = createStore(
    reducer,
    applyMiddleware(...middleware),
  );

  return store;
};

export default configureStore;
