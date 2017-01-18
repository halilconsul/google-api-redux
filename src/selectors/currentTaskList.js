import { createSelector } from 'reselect';

const taskListSelector = store => store.taskLists.taskLists;
const currentTaskListId = store => store.taskLists.currentTaskListId;

const getCurrentTaskList = (taskLists, taskListId) => {
   const currentTaskList = taskLists.filter(task => task.id == taskListId);
   return currentTaskList;
}

export default createSelector(
   taskListSelector,
   currentTaskListId,
   getCurrentTaskList
);
