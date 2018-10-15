import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import contactReducer from '../features/contact/contactReducer';
import authReducer from '../features/auth/authReducer';
import asyncReducer from '../features/async/asyncReducer';
import filterReducer from '../features/filter/filterReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default () => {
//   const store = createStore(
//     combineReducers({
//       contacts: contactReducer,
//       auth: authReducer,
//       async: asyncReducer,
//       filter: filterReducer
//     }),
//     composeEnhancers(applyMiddleware(thunk))
//   );

//   return store;
// };

const appReducer = combineReducers({
  contacts: contactReducer,
  auth: authReducer,
  async: asyncReducer,
  filter: filterReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
