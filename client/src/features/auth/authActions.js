import axios from 'axios';
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_STOP,
  ASYNC_ACTION_ERROR
} from '../async/asyncConstants';
import { LOGIN, LOGOUT } from './authConstants';
import setAuthToken from '../../utils/setAuthToken';

export const logout = () => dispatch => {
  dispatch({ type: ASYNC_ACTION_START });
  axios
    .get('/api/logout')
    .then(res => {
      setAuthToken();
      dispatch({ type: LOGOUT });
      dispatch({ type: ASYNC_ACTION_STOP });
    })
    .catch(err => {
      dispatch({
        type: ASYNC_ACTION_ERROR,
        payload: {
          error: err.response.data.error
        }
      });
    });
};

export const login = user => dispatch => {
  dispatch({ type: ASYNC_ACTION_START });
  axios
    .post('/api/login', user)
    .then(res => {
      setAuthToken(res.headers['x-auth']);
      dispatch({ type: LOGIN });
      dispatch({ type: ASYNC_ACTION_STOP });
    })
    .catch(err => {
      dispatch({
        type: ASYNC_ACTION_ERROR,
        payload: {
          error: err.response.data.error
        }
      });
    });
};

export const register = user => dispatch => {
  dispatch({ type: ASYNC_ACTION_START });
  axios
    .post('/api/user', user)
    .then(res => {
      setAuthToken(res.headers['x-auth']);
      dispatch({ type: LOGIN });
      dispatch({ type: ASYNC_ACTION_STOP });
    })
    .catch(err => {
      dispatch({
        type: ASYNC_ACTION_ERROR,
        payload: {
          error: err.response.data.error
        }
      });
    });
};
