import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import contactReducer from '../features/contact/contactReducer';
import authReducer from '../features/auth/authReducer';
import asyncReducer from '../features/async/asyncReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      contacts: contactReducer,
      auth: authReducer,
      async: asyncReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
