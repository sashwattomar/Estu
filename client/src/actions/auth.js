import {
  REGISTER_SUCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {setAlert} from './alert';
// LOAD USER check1:  RETURN USER => {ID,EMAIL,NHMER PASS ,IS_AUTHNETICATED}
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    // sending the local storage token field
    setAuthToken(localStorage.token); // inside utils folder. FUNC: store the token in header
  }
  try {
    const res = await axios.get('/api/login');
    // .. here respnse is user
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//REGISTER USER
export const register =
  ({name, email, password}) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({name, email, password});
    try {
      const res = await axios.post('/api/register', body, config);
      dispatch({
        type: REGISTER_SUCESS,
        payload: res.data, // res is token sent to client after registering
      });

      dispatch(loadUser()); // to store token to header
    } catch (err) {
      console.log({err});
      const errors = err.response.data.errors;
      const erro = err.response.data.error;
      if (erro) {
        dispatch(setAlert(erro.msg, 'danger'));
      }
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({type: REGISTER_FAIL});
    }
  };

//LOGIN USER CHECKED
export const login =
  ({email, password}) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({email, password});
    try {
      const res = await axios.post('/api/login', body, config);

      dispatch({
        type: LOGIN_SUCESS,
        payload: res.data, // res is token sent to client after registering
      });

      dispatch(loadUser());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.error;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({type: CLEAR_PROFILE});
      dispatch({type: LOGIN_FAIL});
    }
  };

//WORK FLOW
/**
 * IN REGISTERING USER A TOKEN, SENT BY BACKEND IS STORED  IN LOCAL STORAGE NOW
 *  WE HAVE TO PUSH THIS TOKEN TO HEADERS FROM LOCAL-STORAGE.
 * HENCE WHEN EVER THERE IS A RE RENDERING OF APP.JS LOAD USER IS CALLED WHICH STORES TOKEN IN HEADER
 * AND THEN LOGIN IS INITIATED AS DESCRIBED IN LOADUSER ACTION.
 *
 * IMPROVEMENT: TOKEN MUST BE PUSH TO HEADER AS SOON AS STATE OF TOKEN (INSIDE INITIAL_STATE OF AUTH REDUCER ) IS CHANGED
 *
 */

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: LOGOUT});
};
