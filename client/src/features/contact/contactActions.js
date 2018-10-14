import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_STOP,
  ASYNC_ACTION_ERROR
} from '../async/asyncConstants';

import { FETCH_CONTACTS } from './contactConstants';

import axios from 'axios';

export const fetchContacts = () => dispatch => {
  dispatch({ type: ASYNC_ACTION_START });
  axios
    .get('/api/contacts')
    .then(res => {
      dispatch({ type: FETCH_CONTACTS, payload: { contacts: res.data } });
      dispatch({ type: ASYNC_ACTION_STOP });
    })
    .catch(err => {
      dispatch({
        type: ASYNC_ACTION_ERROR,
        payload: { error: 'We cannot fetch your contacts at this time' }
      });
    });
};
