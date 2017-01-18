import AppConstants from '../constants/AppConstants.js';
import { formatTaskList, deleteTask, updateTaskList } from '../utils/index.js';

const initialState = {
   taskLists: [],
   currentTaskListId: ''
}

export default function(state=initialState, action) {
   switch (action.type) {

// ======= __TASK_LISTS_LOAD__ ======= //

      case `${AppConstants.TASK_LISTS_LOAD}_FULFILLED`: {
         const { items } = action.payload.result;
         return {
            ...state,
            taskLists: items.map(formatTaskList)
         }
      }
         break;

      case `${AppConstants.TASK_LISTS_LOAD}_REJECTED`: {
         return {
            ...state,
            taskLists: []
         }
      }
         break;

// ======= __TASK_LIST_LOAD__ ======= //

      case `${AppConstants.TASK_LIST_LOAD}_FULFILLED`: {
         const { id: currentTaskListId } = action.payload.result;
         return {
            ...state,
            currentTaskListId
         }
      }
         break;

// ======= __TASK_LIST_CREATE__ ======= //

      case `${AppConstants.TASK_LIST_CREATE}_FULFILLED`: {
         const newTask = formatTaskList(action.payload.result);
         const allTasks = [...state.taskLists];
         allTasks.unshift(newTask);
         return {
            ...state,
            taskLists: allTasks
         }
      }
         break;

// ======= __TASK_LIST_UPDATE__ ======= //

      case AppConstants.TASK_LIST_UPDATE_PENDING: {
         const newTaskList = action.payload;
         const allTasks = [...state.taskLists];
         return {
            ...state,
            taskLists: updateTaskList(allTasks, newTaskList)
         }
      }
         break;

      case AppConstants.TASK_LIST_UPDATE_FULFILLED: {
         const newTaskList = action.payload.result;
         const allTaskLists = [...state.taskLists];
         return {
            ...state,
            taskLists: updateTaskList(allTaskLists, newTaskList)
         }
      }
         break;

      case AppConstants.TASK_LIST_UPDATE_REJECTED: {
         return {
            ...state,
            taskLists: []
         }
      }
         break;

// ======= __TASK_LIST_DELETE__ ======= //

      case AppConstants.TASK_LIST_DELETE_PENDING: {
         const taskListId = action.payload;
         const allTasks = [...state.taskLists];
         return {
            ...state,
            taskLists: deleteTask(allTasks, taskListId)
         }
      }
         break;

      case AppConstants.TASK_LIST_DELETE_FULFILLED: {
         const { taskListId } = action.payload;
         const allTasks = [...state.taskLists];
         return {
            ...state,
            taskLists: deleteTask(allTasks, taskListId)
         }
      }
         break;

      case AppConstants.TASK_LIST_DELETE_REJECTED: {
         return {
            ...state,
            taskLists: []
         }
      }

         break;
   }
   return state;
}
