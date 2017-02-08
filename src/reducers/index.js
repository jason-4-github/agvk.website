import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import login from './login';
import admin from './admin';

const rootReducer = combineReducers({
  login,
  admin,
  routing: routerReducer,
});

export default rootReducer;
