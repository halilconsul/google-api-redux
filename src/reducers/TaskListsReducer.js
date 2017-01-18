import AppConstants from '../constants/AppConstants.js';

const initialState = {
   taskLists: [],
   currentTaskListId: ''
}

function formatTaskList(data) {
   return {
      id: data.id,
      name: data.title
   }
}

export default function(state=initialState, action) {
   switch (action.type) {
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

      case `${AppConstants.TASK_LIST_LOAD}_FULFILLED`: {
         const { id: currentTaskListId } = action.payload.result;
         return {
            ...state,
            currentTaskListId
         }
      }
         break;

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

      case AppConstants.TASK_LIST_UPDATE_PENDING: {
         const { taskListId } = action.payload;
         const allTasks = [...state.taskLists];
         const updatedTask = allTasks.findIndex(task => task.id == taskListId);
         allTasks[updatedTask].name = action.payload.title;
         return {
            ...state,
            taskLists: allTasks
         }
      }
         break;

      case AppConstants.TASK_LIST_UPDATE_FULFILLED: {
         const { id: taskListId } = action.payload.result;
         const alltaskLists = [...state.taskLists];
         const updatedTaskList = alltaskLists.findIndex(task => task.id === taskListId);
         alltaskLists[updatedTaskList] = formatTaskList(action.payload.result);
         return {
            ...state,
            taskLists: alltaskLists
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

      case AppConstants.TASK_LIST_DELETE_PENDING: {
         const taskListId = action.payload;
         const allTasks = [...state.taskLists];
         const newTasks = allTasks.filter(task => task.id !== taskListId);
         return {
            ...state,
            taskLists: newTasks
         }
      }
         break;

      case AppConstants.TASK_LIST_DELETE_FULFILLED: {
         const { taskListId } = action.payload;
         const allTasks = [...state.taskLists];
         const newTasks = allTasks.filter(task => task.id !== taskListId);
         return {
            ...state,
            taskLists: newTasks
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
