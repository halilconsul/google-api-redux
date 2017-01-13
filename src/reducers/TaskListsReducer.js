import AppConstants from '../constants/AppConstants.js';

const initialState = {
   taskLists: []
}

function formatTaskList(data) {
   return {
      id: data.id,
      name: data.title
   }
}

export default function reducer(state=initialState, action) {
   switch (action.type) {
      case 'TASK_LISTS_LOAD_FULFILLED': {
         const { items } = action.payload.result;
         return {
            ...state,
            taskLists: items.map(formatTaskList)
         }
      }
         break;

      case 'TASK_LISTS_LOAD_REJECTED': {
         return {
            ...state,
            taskLists: []
         }
      }
         break;

      case 'TASK_LIST_CREATE_FULFILLED': {
         const newTask = formatTaskList(action.payload.result);
         const allTasks = [...state.taskLists];
         allTasks.unshift(newTask);
         return {
            ...state,
            taskLists: allTasks
         }
      }

         break;
   }
   return state;
}
