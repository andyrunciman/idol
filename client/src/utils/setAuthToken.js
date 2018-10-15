import axios from 'axios';
/**
 * Adds default headers to axios using the JWT token
 * @param {String} token
 */
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth'] = token;
    sessionStorage.setItem('jwttoken', token);
    //add to local storage so that we can retrieve it upon refresh
  } else {
    delete axios.defaults.headers.common['x-auth'];
    sessionStorage.removeItem('jwttoken');
  }
};

export default setAuthToken;
