import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.js';
import TaskListsReducer from './TaskListsReducer.js';

const rootReducer = combineReducers({
   auth: AuthReducer,
   taskLists: TaskListsReducer
});

export default rootReducer;
