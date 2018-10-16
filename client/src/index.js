import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './features/app/App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import setAuthToken from './utils/setAuthToken';

const store = configureStore();

const token = sessionStorage.getItem('jwttoken');
if (token) {
  setAuthToken(token);

  store.dispatch({ type: 'LOGIN' });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
