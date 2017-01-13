import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class TaskCreateModal extends React.Component {
   constructor() {
      super();
      this.state = {
         text: ''
      }
   }

   handleClose() {

   }

   handleSubmit() {
      
   }

   render() {
      const { text } = this.state;
      const { isOpen } = this.props;

      <MuiThemeProvider>
         <Dialog
            contentStyle={{ maxWidth: 400 }}
            actions={[
               <FlatButton
                  label='Cancel'
                  onClick={this.handleClose.bind(this)}
               />
               <FlatButton
                  label='Submit'
                  primary={true}
                  disabled={!text}
                  onClick={this.handleSubmit.bind(this)}
               />
            ]}
            open={isOpen}
            onRequestClose={this.handleClose.bind(this)}
         >

         </Dialog>
      </MuiThemeProvider>
   }
}
