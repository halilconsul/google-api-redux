import AppConstants from '../constants/AppConstants.js';
import { formatTasks, getErrorMessageByCode, deleteTask, updateTask } from '../utils/index.js';
const initialState = {
   tasks: [],
   isLoading: true,
   error: null
}

export default function(state=initialState, action) {
   switch (action.type) {

// ======= __TASKS_LOAD__ ======= //

      case `${AppConstants.TASKS_LOAD}_PENDING`: {
         return {
            ...state,
            isLoading: true,
            error: null
         }
      }
         break;

      case `${AppConstants.TASKS_LOAD}_FULFILLED`: {
         const { items } = action.payload.result;
         if (items) {
            return {
               ...state,
               tasks: items.map(formatTasks),
               isLoading: false,
               error: null
            }
         } else {
            return {
               ...state,
               tasks: [],
               isLoading: false,
               error: null
            }
         }
      }
         break;

         case `${AppConstants.TASKS_LOAD}_REJECTED`: {
            const { code: errorCode } = action.payload.result.error;
            return {
               ...state,
               isLoading: false,
               error: getErrorMessageByCode(errorCode)
            }
         }
            break;

// ======= __TASK_UPDATE__ ======= //

      case AppConstants.TASK_UPDATE_PENDING: {
         // if the object has 'isCompleted', it will be replaced
         // if it doesn't, nothing will be changed
         // the same thing with 'text'
         const { taskId } = action.payload;
         const { isCompleted } = action.payload;
         const allTasks = [...state.tasks];
         const updatedTask = allTasks.findIndex(task => task.id === taskId);
         allTasks[updatedTask].isCompleted = isCompleted !== undefined ? isCompleted : allTasks[updatedTask].isCompleted;
         allTasks[updatedTask].text = action.payload.text || allTasks[updatedTask].text;
         return {
            ...state,
            tasks: allTasks
         }
      }
         break;

      case AppConstants.TASK_UPDATE_FULFILLED: {
         const newTask = action.payload.result;
         const allTasks = [...state.tasks];
         return {
            ...state,
            tasks: updateTask(allTasks, newTask)
         }
      }
         break;

      case AppConstants.TASK_UPDATE_REJECTED: {
         return {
            ...state,
            tasks: []
         }
      }
         break;

// ======= __TASK_CREATE__ ======= //

      case `${AppConstants.TASK_CREATE}_FULFILLED`: {
         const newTask = formatTasks(action.payload.result);
         const allTasks = [...state.tasks];
         allTasks.unshift(newTask);
         return {
            ...state,
            tasks: allTasks
         }
      }
         break;

// ======= __TASK_DELETE__ ======= //

      case AppConstants.TASK_DELETE_PENDING: {
         const { taskId } = action.payload;
         const allTasks = [...state.tasks];
         return {
            ...state,
            tasks: deleteTask(allTasks, taskId)
         }
      }
         break;

      case AppConstants.TASK_DELETE_FULFILLED: {
         const { taskId } = action.payload;
         const allTasks = [...state.tasks];
         return {
            ...state,
            tasks: deleteTask(allTasks, taskId)
         }
      }
         break;

      case AppConstants.TASK_DELETE_REJECTED: {
         return {
            ...state,
            tasks: []
         }
      }
         break;
   }
   return state;
}
