// this file deals with storing token sent to headers or deleting it
import axios from 'axios';
const setAuthToken = (token) => {
  if (token) {
    // if there is token
    axios.defaults.headers.common['x-auth-token'] = token; // will set token to gloabal  headers
  } else {
    delete axios.defaults.headers.common['x-auth-token']; // if token is not in local storage delete it from header
  }
};
export default setAuthToken;
