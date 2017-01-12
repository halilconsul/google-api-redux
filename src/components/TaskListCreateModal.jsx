import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class TaskListCreateModal extends React.Component {
   render() {
      return (
         <MuiThemeProvider>
            <Dialog
               contentStyle={{ maxWidth: 400 }}
               actions={[
                  <FlatButton
                     label='Cancel'
                  />,
                  <FlatButton
                     label='Submit'
                     primary={true}
                  />
               ]}
               open={isOpen}
               onRequestClose={this.handleClose.bind(this)}
            >
               <h3 className="TaskListCreateModal">Add taskList</h3>

            </Dialog>
         </MuiThemeProvider>
      );
   }
}

export default TaskListCreateModal;
