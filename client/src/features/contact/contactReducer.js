import {
  ADD_CONTACT,
  DELETE_CONTACT,
  FETCH_CONTACTS,
  EDIT_CONTACT
} from './contactConstants';

const contactReducer = (state = [], actions) => {
  switch (actions.type) {
    case ADD_CONTACT:
      return [...state, splitNames(actions.payload)];
    case DELETE_CONTACT:
      return state.filter(contact => contact._id !== actions.payload._id);
    case EDIT_CONTACT:
      return state.map(contact => {
        if (contact._id === actions.payload._id) {
          return splitNames(actions.payload);
        }
        return contact;
      });
    case FETCH_CONTACTS:
      return actions.payload.contacts.map(contact => splitNames(contact));
    default:
      return state;
  }
};

/**
 * Adds a sort key based on the users name e.g Adam [Jones],  Fred [Fred], Evie Grace Philips, [Philips]
 * @param {Contact} contact
 */
const splitNames = contact => {
  //e.g Evie Grace Philips = ['Evie','Grace','Phillips']
  contact.names = contact.name.split(' ');
  return contact;
};

export default contactReducer;

//TODO-- Move split names to the back end
