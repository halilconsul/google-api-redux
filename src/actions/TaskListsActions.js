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

   loadTaskList(taskListId) {
      const request = api.showTaskList(taskListId);
      return {
         type: AppConstants.TASK_LIST_LOAD,
         payload: request
      }
   },

   createTaskList(taskList) {
      const request = api.insertTaskList({ title: taskList.name });
      return {
         type: AppConstants.TASK_LIST_CREATE,
         payload: request
      }
   },

   updateTaskList(params) {
      const request = api.updateTaskList({
         taskListId: params.taskListId,
         title: params.name
      });
      return {
         type: AppConstants.TASK_LIST_UPDATE,
         payload: request
      }
   },

   deleteTaskList(params) {
      return function(dispatch) {
         dispatch({
            type: AppConstants.TASK_LIST_DELETE_PENDING,
            payload: params.taskListId
         });
         api.deleteTaskList({
            taskListId: params.taskListId
         })
         .then(response => {
            dispatch({
               type: AppConstants.TASK_LIST_DELETE_FULFILLED,
               payload: {
                  'taskListId': params.taskListId,
                  response
               }
            });
         })
         .catch(err => {
            dispatch({
               type: AppConstants.TASK_LIST_DELETE_REJECTED,
               payload: err
            });
         });
      }
   }
}

export default TaskListsActions;
