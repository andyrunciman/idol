import {
  ADD_CONTACT,
  DELETE_CONTACT,
  FETCH_CONTACTS,
  EDIT_CONTACT
} from './contactConstants';

const contactReducer = (state = [], actions) => {
  switch (actions.type) {
    case ADD_CONTACT:
      return [...state.contacts, actions.payload.contact];
    case DELETE_CONTACT:
      return state.filter(contact => contact._id !== actions.payload.id);
    case EDIT_CONTACT:
      return state.map(contact => {
        if (contact._id === actions.payload.id) {
          return actions.contact;
        }
        return contact;
      });
    case FETCH_CONTACTS:
      return actions.payload.contacts;
    default:
      return state;
  }
};

export default contactReducer;
