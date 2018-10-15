import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_STOP,
  ASYNC_ACTION_ERROR
} from '../async/asyncConstants';
import {
  FETCH_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT
} from './contactConstants';

import axios from 'axios';

/**
 * Edit a contact and redirects if successful
 * @param {Object} contact
 * @param {Object} history
 */
export const updateContact = (id, contact, history) => dispatch => {
  dispatch({ type: ASYNC_ACTION_START });
  axios
    .patch(`/api/contact/${id}`, contact)
    .then(res => {
      dispatch({ type: EDIT_CONTACT, payload: res.data });
      dispatch({ type: ASYNC_ACTION_STOP });
      history.push('/dashboard');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ASYNC_ACTION_ERROR,
        payload: { error: err.response.data.errors }
      });
    });
};

/**
 * Deletes a contact and redirects if successful
 * @param {Object} contact
 * @param {Object} history
 */
export const deleteContact = (id, history) => dispatch => {
  dispatch({ type: ASYNC_ACTION_START });
  axios
    .delete(`/api/contact/${id}`)
    .then(res => {
      dispatch({ type: DELETE_CONTACT, payload: res.data });
      dispatch({ type: ASYNC_ACTION_STOP });
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: ASYNC_ACTION_ERROR,
        payload: { error: err.response.data.errors }
      });
    });
};

/**
 * Creates a contact and redirects if successful
 * @param {Object} contact
 * @param {Object} history
 */
export const createContact = (contact, history) => dispatch => {
  dispatch({ type: ASYNC_ACTION_START });
  axios
    .post('/api/contact', contact)
    .then(res => {
      dispatch({ type: ADD_CONTACT, payload: res.data });
      dispatch({ type: ASYNC_ACTION_STOP });
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: ASYNC_ACTION_ERROR,
        payload: { error: err.response.data.errors }
      });
    });
};

/**
 * Fetch the contacts for the logged in user
 */
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
