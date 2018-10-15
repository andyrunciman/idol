import { SET_FILTER, CLEAR_FILTER } from './filterConstants';

export const filterReducer = (state = null, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    case CLEAR_FILTER:
      return null;
    default:
      return state;
  }
};

export default filterReducer;
