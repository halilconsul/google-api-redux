import AppConstants from '../constants/AppConstants.js';

const initialState = {
   tasks: [],
   isLoading: true,
   error: null
}

function formatTasks(data) {
   return {
      id: data.id,
      text: data.title,
      notes: data.notes,
      dueTime: data.due ? new Date(data.due) : '',
      isCompleted: data.status === 'completed',
      position: data.position
   }
}

function getErrorMessageByCode(code) {
   const errorMessages = {
      400: 'Cannot load taskList (what da fuck)'
   };
   return errorMessages[code] || 'Something bad happened'
}

export default function(state=initialState, action) {
   switch (action.type) {
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

      case AppConstants.TASK_UPDATE_PENDING: {
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
         const { id } = action.payload.result;
         const allTasks = [...state.tasks];
         const updatedTaskIndex = allTasks.findIndex(task => task.id === id);
         allTasks[updatedTaskIndex] = formatTasks(action.payload.result);
         return {
            ...state,
            tasks: allTasks
         }
      }
         break;

         // function getCurrentTaskList(allTasks, taskListId) {
         //    const newTask = allTasks.filter(task => task.id === taskListId);
         //    return newTask;
         // }

      case AppConstants.TASK_UPDATE_REJECTED: {
         return {
            ...state,
            tasks: []
         }
      }
         break;

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

      case AppConstants.TASK_DELETE_PENDING: {
         const { taskId } = action.payload;
         const allTasks = [...state.tasks];
         const newTasks = allTasks.filter(task => task.id !== taskId);
         return {
            ...state,
            tasks: newTasks
         }
      }
         break;

      case AppConstants.TASK_DELETE_FULFILLED: {
         const { taskId } = action.payload;
         const allTasks = [...state.tasks];
         const newTasks = allTasks.filter(task => task.id !== taskId);
         return {
            ...state,
            tasks: newTasks
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
