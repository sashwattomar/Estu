import {
  REGISTER_FAIL,
  REGISTER_SUCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCESS,
  LOGOUT,
} from '../actions/types';

const InitialState = {
  token: localStorage.getItem('token'), // initially empty
  isAuthenticated: false,
  loading: true, //false denotes requests reached  backend
  user: null,
};
// providing values to initial state parametres is crucial in case of private routes as
// if refreshed will check is Authenticated to confirm acess of user to privae route again.
//   Setting  them to null will hold the acess untill somehow is authenticates turns true again.
export default function aut(state = InitialState, action) {
  const {type, payload} = action;
  switch (type) {
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    }

    case REGISTER_SUCESS:
    case LOGIN_SUCESS:
      localStorage.setItem('token', payload.token); // setting token in local storage
      return {
        ...state,
        ...payload, //payload just contains token so its equivallent of token:action.payload.token
        isAuthenticated: true,
        loading: false, // req received at backend
        //user is left
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null, //payload just contains token so its equivallent of token:action.payload.token
        isAuthenticated: false,
        loading: false, // req received at backend
      };

    default:
      return state;
  }
}
