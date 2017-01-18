export function formatTasks(data) {
   return {
      id: data.id,
      text: data.title,
      notes: data.notes,
      dueTime: data.due ? new Date(data.due) : '',
      isCompleted: data.status === 'completed',
      position: data.position
   }
}

export function formatTaskList(data) {
   return {
      id: data.id,
      name: data.title
   }
}

export function getErrorMessageByCode(code) {
   const errorMessages = {
      400: 'Cannot load taskList (what da fuck)'
   };
   return errorMessages[code] || 'Something bad happened'
}

export function deleteTask(allTasks, taskId) {
   const newTasks = allTasks.filter(task => task.id !== taskId);
   return newTasks;
}

export function updateTask(allTasks, newTask) {
   const updatedTaskIndex = allTasks.findIndex(task => task.id === newTask.id);
   allTasks[updatedTaskIndex] = formatTasks(newTask);
   return allTasks;
}

export function updateTaskList(allTasks, taskList) {
   const updatedTask = allTasks.findIndex(task => task.id === taskList.id);
   allTasks[updatedTask] = formatTaskList(taskList);
   return allTasks;
}
