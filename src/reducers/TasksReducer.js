import AppConstants from '../constants/AppConstants.js';

const initialState = {
   tasks: []
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

export default function reducer(state=initialState, action) {
   switch (action.type) {
      case 'TASKS_LOAD_FULFILLED': {
         const { items } = action.payload.result;
         if (items) {
            return {
               ...state,
               tasks: items.map(formatTasks)
            }
         } else {
            return {
               ...state,
               tasks: []
            }
         }
      }
         break;

      case 'TASKS_LOAD_REJECTED': {
         return {
            ...state,
            tasks: []
         }
      }
         break;

      case 'TASK_UPDATE_FULFILLED': {
         const { id } = action.payload.result;
         const allTasks = [...state.tasks];
         const updatedTask = allTasks.findIndex(task => task.id == id);
         allTasks[updatedTask] = formatTasks(action.payload.result);
         return {
            ...state,
            tasks: allTasks
         }
      }
         break;
   }
   return state;
}
