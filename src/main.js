import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import SessionActions from './actions/SessionActions.js';
import routes from './routes/index.js';

window.handleGoogleApiLoaded = () => {
   store.dispatch(SessionActions.authorize(false, renderApp));
};

function renderApp() {
   ReactDOM.render(
      <Provider store={store}>
         {routes}
      </Provider>,
      document.getElementById('mount-point')
   );
}
