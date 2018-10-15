import { SET_FILTER, CLEAR_FILTER } from './filterConstants';

export const setFilter = filter => ({ type: SET_FILTER, payload: filter });
export const clearFilter = () => ({ type: CLEAR_FILTER });
