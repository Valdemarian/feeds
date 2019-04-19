import { combineReducers } from 'redux';

import auth from './auth';
import feeds from './feeds';
import googleAuth from './google-auth';


export const rootReducer = combineReducers({
  auth,
  feeds,
  googleAuth
})