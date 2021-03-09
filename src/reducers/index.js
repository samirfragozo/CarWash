import {combineReducers} from 'redux';
import app from './appReducer';
import auth from './authReducer';
import base from './baseReducer';

export default combineReducers({app, auth, base});
