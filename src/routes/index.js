import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import store from '../store/index.js';

import App from '../App.jsx';
import LoggedInLayout from '../components/LoggedInLayout.jsx';
import AboutPage from '../components/AboutPage.jsx';

import LoginPage from '../containers/LoginPage.jsx';
import TaskListsPage from '../containers/TaskListsPage.jsx';
import TasksPage from '../containers/TasksPage.jsx';

const routes = (
   <Router history={hashHistory}>
      <Route path='/' component={App}>
         <Route path='/login' component={LoginPage} />
         <Route component={LoggedInLayout} onEnter={requireAuth}>
            <Route path='/about' component={AboutPage} />
            <Route path='/lists' component={TaskListsPage}>
               <Route path='/lists/:id' component={TasksPage} />
            </Route>
         </Route>
      </Route>
   </Router>
);

function requireAuth(nextState, replace) {
   const isLoggedIn = store.getState().auth.isLoggedIn;
   if (!isLoggedIn) {
      replace({
         pathname: '/login',
         state: { nextPathname: nextState.location.pathname }
      })
   }
}

export default routes;
