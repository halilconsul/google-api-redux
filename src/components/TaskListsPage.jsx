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
import AddButton from 'material-ui/svg-icons/content/add-circle-outline';

const TaskListsPage = props => (
   <div className="TaskListsPage">
      <MuiThemeProvider>
         <div className="TaskListsPage__menu">
            <List>
               <ListItem
                  primaryText="Home"
                  leftIcon={<HomeButton />}
               />
               <ListItem
                  primaryText="About"
                  leftIcon={<ActionAssignment />}
               />
               <Divider />
               <Subheader>TaskLists</Subheader>
               {
                  props.taskLists.map(task =>
                     <ListItem
                        key={task.id}
                        primaryText={task.name}
                        leftIcon={<FileFolder />}
                        onClick={props.onRouteChange.bind(null, task.id)}
                     />
                  )
               }
            </List>
            <Divider />
            <List>
               <ListItem
                  primaryText="Create new task"
                  leftIcon={<AddButton />}
               />
               <ListItem
                  primaryText="Log out"
                  leftIcon={<ExitButton />}
               />
            </List>
         </div>
      </MuiThemeProvider>
   </div>
);

TaskListsPage.propTypes = {
   taskLists: React.PropTypes.array,
   onRouteChange: React.PropTypes.func
}

export default TaskListsPage;
