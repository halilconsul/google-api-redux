import AppConstants from '../constants/AppConstants.js';
import { listTasks, insertTask, updateTask, deleteTask } from '../api/index.js';

const TasksActions = {
   loadTasks(taskListId) {
      const request = listTasks(taskListId);
      return {
         type: AppConstants.TASKS_LOAD,
         payload: request
      }
   },

   createTask(params) {
      const request = insertTask({
         taskListId: params.taskListId,
         title: params.name
      });
      return {
         type: AppConstants.TASK_CREATE,
         payload: request
      }
   },

   updateTaskStatus(params) {
      return function(dispatch) {
         dispatch({
            type: AppConstants.TASK_UPDATE_PENDING,
            payload: {
               'taskId': params.taskId,
               'isCompleted': params.isCompleted
            }
         });
         updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            status: params.isCompleted ? 'completed' : 'needsAction'
         })
         .then(response => {
            dispatch({
               type: AppConstants.TASK_UPDATE_FULFILLED,
               payload: response
            });
         })
         .catch(err => {
            dispatch({
               type: AppConstants.TASK_UPDATE_REJECTED,
               payload: err
            });
         });
      }
   },

   updateTask(params) {
      return function(dispatch) {
         dispatch({
            type: AppConstants.TASK_UPDATE_PENDING,
            payload: {
               'taskId': params.taskId,
               'text': params.text
            }
         });
         updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            title: params.text
         })
         .then(response => {
            dispatch({
               type: AppConstants.TASK_UPDATE_FULFILLED,
               payload: response
            });
         })
         .catch(err => {
            dispatch({
               type: AppConstants.TASK_UPDATE_REJECTED,
               payload: err
            });
         });
      }
   },

   deleteTask(params) {
      return function(dispatch) {
         dispatch({
            type: AppConstants.TASK_DELETE_PENDING,
            payload: {
               'taskId': params.taskId
            }
         });
         deleteTask({
            taskListId: params.taskListId,
            taskId: params.taskId
         })
         .then(response => {
            dispatch({
               type: AppConstants.TASK_DELETE_FULFILLED,
               payload: {
                  'taskId': params.taskId,
                  response
               }
            });
         })
         .catch(err => {
            dispatch({
               type: AppConstants.TASK_DELETE_REJECTED,
               payload: err
            });
         });
      }
   }
}

export default TasksActions;
