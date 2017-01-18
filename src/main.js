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


// function generateTable(number, colors) {
// 	const items = [];
//   for(let i = 0; i < number/2; i++) {
//   	const item = [
//     	{
//         id: Math.random(),
//         isFlipped: false,
//         isValid: true,
//         color: colors[i]
//       },
//       {
//       	id: Math.random(),
//         isFlipped: false,
//         isValid: true,
//         color: colors[i]
//       }
//     ];
//     item.map(item => items.push(item));
//   }
//   return items;
// }
//
// const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'silver', 'pink'];
//
// console.log(generateTable(14, colors));
