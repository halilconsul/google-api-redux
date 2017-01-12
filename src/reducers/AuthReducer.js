import AppConstants from '../constants/AppConstants.js';

const initialState = {
   isLoggedIn: false
}

export default function reducer(state=initialState, action) {
   switch (action.type) {
      case 'SESSION_AUTHORIZE_FULFILLED': {
         return {
            ...state,
            isLoggedIn: true
         }
      }
         break;

      case 'SESSION_AUTHORIZE_REJECTED': {
         return {
            ...state,
            isLoggedIn: false
         }
      }

         break;
   }
   return state;
}
