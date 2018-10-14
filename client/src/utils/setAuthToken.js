import axios from 'axios';
/**
 * Adds default headers to axios using the JWT token
 * @param {String} token
 */
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth'];
  }
};

export default setAuthToken;
