import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import HomeButton from 'material-ui/svg-icons/action/home';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ExitButton from 'material-ui/svg-icons/action/exit-to-app';
import AddButton from 'material-ui/svg-icons/content/add';
import './TaskListsPage.scss';

class TaskListsPage extends React.Component {
   renderNavButtons() {
      return (
         <List>
            <ListItem
               primaryText="Home"
               leftIcon={<HomeButton />}
            />
            <ListItem
               primaryText="About"
               leftIcon={<ActionAssignment />}
            />
         </List>
      );
   }

   renderTaskLists() {
      return (
         <List>
            <Subheader>TaskLists</Subheader>
            {
               this.props.taskLists.map(task =>
                  <ListItem
                     key={task.id}
                     primaryText={task.name}
                     leftIcon={this.props.currentTaskListId === task.id ? <FileFolderOpen /> : <FileFolder />}
                     onClick={this.props.onRouteChange.bind(null, task.id)}
                  />
               )
            }
         </List>
      );
   }

   renderControlButtons() {
      return (
         <List>
            <ListItem
               primaryText="Create new task"
               leftIcon={<AddButton />}
               onClick={this.props.onAddTaskList}
            />
            <ListItem
               primaryText="Log out"
               leftIcon={<ExitButton />}
            />
         </List>
      );
   }

   renderTaskListPage() {
      return (
         <div className="TaskListsPage__menu">
            {this.renderNavButtons()}
            <Divider />
            {this.renderTaskLists()}
            <Divider />
            {this.renderControlButtons()}
         </div>
      );
   }

   render() {
      return (
         <div className="TaskListsPage">
            <MuiThemeProvider>
               {this.renderTaskListPage()}
            </MuiThemeProvider>
            <div className="TaskListsPage__children">
               {this.props.children}
            </div>
         </div>
      );
   }
}

TaskListsPage.propTypes = {
   taskLists: React.PropTypes.array,
   children: React.PropTypes.object,
   currentTaskListId: React.PropTypes.string,
   onRouteChange: React.PropTypes.func,
   onAddTaskList: React.PropTypes.func
}

export default TaskListsPage;
