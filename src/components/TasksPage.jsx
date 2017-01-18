import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import CircularProgress from 'material-ui/CircularProgress';
import Task from './Task.jsx';
import './TasksPage.scss';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class TasksPage extends React.Component {
   constructor() {
      super();
      this.state = { isEditingTaskList: false }
   }

   handleEditTaskList() {
      this.setState({ isEditingTaskList: true }, () => this.input.focus());
   }

   handleKeyDown(e) {
      if (e.keyCode === ENTER_KEY) {
         this.props.onTaskListEdit({
            name: this.input.value
         });
         this.closeEditing();
      }
      if (e.keyCode === ESC_KEY) {
         this.closeEditing();
      }
   }

   closeEditing() {
      this.setState({ isEditingTaskList: false });
   }

   renderControlButtons() {
      return (
         <div className="TasksPage__tools">
            <FlatButton
               label="Add task"
               labelPosition="after"
               primary={true}
               icon={<ContentAdd />}
               onClick={this.props.onTaskAdd}
            />
            <FlatButton
               label="Delete task"
               labelPosition="after"
               secondary={true}
               icon={<ContentDelete />}
               onClick={this.props.onTaskListDelete}
            />
         </div>
      );
   }

   editedTitle() {
      return (
         <input
            className="TasksPage__title-edit"
            type="text"
            ref={c => this.input = c}
            defaultValue={this.props.currentTaskList[0].name}
            onKeyDown={this.handleKeyDown.bind(this)}
         />
      );
   }

   completedTitle() {
      return (
         <h2 className="TasksPage__title" onClick={this.handleEditTaskList.bind(this)}>
            {this.props.currentTaskList[0] ? this.props.currentTaskList[0].name : null}
         </h2>
      );
   }

   showLoader() {
      return <CircularProgress size={4} />
   }

   renderTasks() {
      return (
         this.props.tasks.map(task =>
            <Task
               key={task.id}
               text={task.text}
               note={task.note}
               due={task.due}
               isCompleted={task.isCompleted}
               onStatusChange={this.props.onTaskStatusChange.bind(null, task.id)}
               onUpdate={this.props.onTaskUpdate.bind(null, task.id)}
               onDelete={this.props.onTaskDelete.bind(null, task.id)}
            />
         )
      );
   }

   loadTasks() {
      if (this.props.isLoadingTask) {
         return this.showLoader();
      } else {
         return this.renderTasks();
      }
   }

   renderHeaderTitle() {
      if (this.state.isEditingTaskList) {
         return this.editedTitle();
      } else {
         return this.completedTitle();
      }
   }

   showTasks() {
      return (
         <MuiThemeProvider>
            <div className="TasksPage">
               <div className="TasksPage__header">
                  {this.renderHeaderTitle()}
                  {this.renderControlButtons()}
               </div>
               <div className="TasksPage__tasks">
                  {this.loadTasks()}
               </div>
            </div>
         </MuiThemeProvider>
      );
   }

   renderError() {
      return (
         <div className="TasksPage">
            <h2 className="TasksPage__error">
               {this.props.error}
            </h2>
         </div>
      );
   }

   render() {
      if (this.props.error) {
         return this.renderError();
      } else {
         return this.showTasks();
      }
   }
}

TasksPage.propTypes = {
   tasks: React.PropTypes.array,
   error: React.PropTypes.string,
   taskList: React.PropTypes.object,
   currentTaskList: React.PropTypes.array,
   isLoadingTask: React.PropTypes.bool,
   onTaskAdd: React.PropTypes.func,
   onTaskDelete: React.PropTypes.func,
   onTaskStatusChange: React.PropTypes.func,
   onTaskUpdate: React.PropTypes.func,
   onTaskListDelete: React.PropTypes.func,
   onTaskListEdit: React.PropTypes.func
}

export default TasksPage;
