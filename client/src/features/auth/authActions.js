import axios from 'axios';
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_STOP,
  ASYNC_ACTION_ERROR
} from '../async/asyncConstants';
import { LOGIN } from './authConstants';
import setAuthToken from '../../utils/setAuthToken';

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
