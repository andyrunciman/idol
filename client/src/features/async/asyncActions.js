import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from './asyncConstants';

export const asyncStart = () => ({
  type: ASYNC_ACTION_START
});

export const asyncStop = () => ({
  type: ASYNC_ACTION_FINISH
});

export const asyncError = error => ({
  type: ASYNC_ACTION_ERROR,
  payload: {
    error
  }
});
