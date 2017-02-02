import AppConstants from '../constants/AppConstants.js';
import { listTaskLists, showTaskList, insertTaskList, updateTaskList, deleteTaskList,  } from '../api/index.js';

const TaskListsActions = {
   loadTaskLists() {
      const request = listTaskLists();
      return {
         type: AppConstants.TASK_LISTS_LOAD,
         payload: request
      }
   },

   loadTaskList(taskListId) {
      const request = showTaskList(taskListId);
      return {
         type: AppConstants.TASK_LIST_LOAD,
         payload: request
      }
   },

   createTaskList(taskList) {
      const request = insertTaskList({ title: taskList.name });
      return {
         type: AppConstants.TASK_LIST_CREATE,
         payload: request
      }
   },

   updateTaskList(params) {
      return function(dispatch) {
         dispatch({
            type: AppConstants.TASK_LIST_UPDATE_PENDING,
            payload: {
               'id': params.taskListId,
               'title': params.name
            }
         });
         updateTaskList({
            taskListId: params.taskListId,
            title: params.name
         })
         .then(response => {
            dispatch({
               type: AppConstants.TASK_LIST_UPDATE_FULFILLED,
               payload: response
            });
         })
         .catch(err => {
            dispatch({
               type: AppConstants.TASK_LIST_UPDATE_REJECTED,
               payload: err
            });
         });
      }
   },

   deleteTaskList(params) {
      return function(dispatch) {
         dispatch({
            type: AppConstants.TASK_LIST_DELETE_PENDING,
            payload: params.taskListId
         });
         deleteTaskList({
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
