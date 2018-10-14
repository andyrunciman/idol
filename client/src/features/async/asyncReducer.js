import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_STOP,
  ASYNC_ACTION_ERROR
} from './asyncConstants';

const initialState = {
  loading: false,
  error: null
};

const asyncReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ASYNC_ACTION_STOP:
      return {
        ...state,
        loading: false,
        error: null
      };
    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload.error
      };
    default:
      return state;
  }
};

export default asyncReducer;
