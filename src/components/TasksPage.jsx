import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import CircularProgress from 'material-ui/CircularProgress';
import Task from './Task.jsx';
import './TasksPage.scss';

const TasksPage = props => (
   <MuiThemeProvider>
      <div className="TasksPage">
         <div className="TasksPage__header">
            <h3 className="TasksPage__title">TaskLists</h3>
               <div className="TasksPage__tools">
                  <FlatButton
                     label="Add task"
                     labelPosition="after"
                     primary={true}
                     icon={<ContentAdd />}
                     onClick={props.onTaskAdd}
                  />
                  <FlatButton
                     label="Delete task"
                     labelPosition="after"
                     secondary={true}
                     icon={<ContentDelete />}
                     onClick={props.onTaskListDelete}
                  />
               </div>
         </div>
         {
            props.isLoadingTask
            ?
               <CircularProgress size={4} />
            :
               <div className="TasksPage__tasks">
                  {
                     props.tasks.map(task =>
                        <Task
                           key={task.id}
                           text={task.text}
                           note={task.note}
                           due={task.due}
                           isCompleted={task.isCompleted}
                           onStatusChange={props.onTaskStatusChange.bind(null, task.id)}
                           onUpdate={props.onTaskUpdate.bind(null, task.id)}
                           onDelete={props.onTaskDelete.bind(null, task.id)}
                        />
                     )
                  }
               </div>
         }
      </div>
   </MuiThemeProvider>
);

TasksPage.propTypes = {
   tasks: React.PropTypes.array,
   isLoadingTask: React.PropTypes.bool,
   onTaskAdd: React.PropTypes.func,
   onTaskDelete: React.PropTypes.func,
   onTaskStatusChange: React.PropTypes.func,
   onTaskUpdate: React.PropTypes.func,
   onTaskListDelete: React.PropTypes.func
}

export default TasksPage;
