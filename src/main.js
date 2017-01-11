import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store/index.js';
import App from './App.jsx';

ReactDOM.render(
   <Provider store={store}>
      <Router history={hashHistory}>
         <Route path='/' component={App}>

         </Route>
      </Router>
   </Provider>,
   document.getElementById('mount-point')
);
