import AppConstants from '../constants/AppConstants.js';
import api from '../api/index.js';

const TaskListsActions = {
   loadTaskLists() {
      const request = api.listTaskLists();
      return {
         type: AppConstants.TASK_LISTS_LOAD,
         payload: request
      }
   },

   createTaskList(taskList) {
      const request = api.insertTaskList({ title: taskList.name });
      return {
         type: AppConstants.TASK_LIST_CREATE,
         payload: request
      }
   }
}

export default TaskListsActions;
