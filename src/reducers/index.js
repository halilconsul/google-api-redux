import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.js';
import TaskListsReducer from './TaskListsReducer.js';
import TasksReducer from './TasksReducer.js';

const rootReducer = combineReducers({
   auth: AuthReducer,
   taskLists: TaskListsReducer,
   tasks: TasksReducer
});

export default rootReducer;
