import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import Task from './Task.jsx';
import './TasksPage.scss';

const TasksPage = props => (
   <div className="TasksPage">
      <div className="TasksPage__header">
         <h3 className="TasksPage__title">TaskLists</h3>
         <MuiThemeProvider>
            <div className="TasksPage__tools">
               <FlatButton
                  label="Add task"
                  labelPosition="after"
                  primary={true}
                  icon={<ContentAdd />}
               />
               <FlatButton
                  label="Delete task"
                  labelPosition="after"
                  secondary={true}
                  icon={<ContentDelete />}
               />
            </div>
         </MuiThemeProvider>
      </div>
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
               />
            )
         }
      </div>
   </div>
);

TasksPage.propTypes = {
   tasks: React.PropTypes.array,
   onTaskStatusChange: React.PropTypes.func
}

export default TasksPage;
