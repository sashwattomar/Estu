//ROOT REDUCER
import alert from './alert';
import auth from './auth';
import profile from './profile';
import {combineReducers} from 'redux';
export default combineReducers({
  alert,
  auth,
  profile,
});
