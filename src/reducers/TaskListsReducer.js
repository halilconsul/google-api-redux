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
      case 'TASK_LIST_LOAD_FULFILLED': {
         const { items } = action.payload.result;
         return {
            ...state,
            taskLists: items.map(formatTaskList)
         }
      }
         break;

      case 'TASK_LIST_LOAD_REJECTED': {
         return {
            ...state,
            taskLists: []
         }
      }

         break;
   }
   return state;
}
