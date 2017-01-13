import AppConstants from '../constants/AppConstants.js';
import api from '../api/index.js';

const TasksActions = {
   loadTasks(taskListId) {
      const request = api.listTasks(taskListId);
      return {
         type: AppConstants.TASKS_LOAD,
         payload: request
      }
   },

   updateTaskStatus(params) {
      const request = api.updateTask({
         taskListId: params.taskListId,
         taskId: params.taskId,
         status: params.isCompleted ? 'completed' : 'needsAction'
      });
      return {
         type: AppConstants.TASK_UPDATE,
         payload: request
      }
   }
}

export default TasksActions;
