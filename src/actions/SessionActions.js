import AppConstants from '../constants/AppConstants.js';
import { authorize } from '../api/index.js';

const SessionActions = {
   authorize(immediate=false, callback) {
      if (callback) callback();
      const request = authorize({immediate});
      return {
         type: AppConstants.SESSION_AUTHORIZE,
         payload: request
      }
   }
}

export default SessionActions;
