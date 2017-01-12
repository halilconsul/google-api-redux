import AppConstants from '../constants/AppConstants.js';
import api from '../api/index.js';

const TaskListsActions = {
   loadTaskLists() {
      const request = api.listTaskLists();
      return {
         type: AppConstants.TASK_LIST_LOAD,
         payload: request
      }
   }
}

export default TaskListsActions;
