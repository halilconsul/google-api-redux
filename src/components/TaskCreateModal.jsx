import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class TaskCreateModal extends React.Component {
   constructor() {
      super();
      this.state = { text: '' }
   }

   handleClose() {
      const { onClose } = this.props;
      if (onClose) onClose();
      this.clearTextState();
   }

   handleSubmit() {
      const { onSubmit } = this.props;
      if (onSubmit) {
         onSubmit({ text: this.state.text });
      }
      this.clearTextState();
   }

   handleKeyDown(e) {
      if (e.keyCode === ENTER_KEY) {
         this.handleSubmit();
      }
      if (e.keyCode === ESC_KEY) {
         this.handleClose();
      }
   }

   clearTextState() {
      this.setState({ text: '' });
   }

   handleTextChange(e) {
      this.setState({ text: e.target.value });
   }

   render() {
      const { text } = this.state;
      const { isOpen } = this.props;
      const actions = [
         <FlatButton
            label='Cancel'
            onClick={this.handleClose.bind(this)}
         />,
         <FlatButton
            label='Submit'
            primary={true}
            disabled={!text}
            onClick={this.handleSubmit.bind(this)}
         />
      ];

      return (
         <MuiThemeProvider>
            <Dialog
               contentStyle={{ maxWidth: 400 }}
               actions={actions}
               open={isOpen}
               onRequestClose={this.handleClose.bind(this)}
            >
            <h3 className="TaskCreateModal__title">Add Task</h3>
            <TextField
               fullWidth
               ref={c => this.taskinput = c}
               value={text}
               hintText='e.g. buy a bottle of milk'
               floatingLabelText='Enter task Description'
               onChange={this.handleTextChange.bind(this)}
               onKeyDown={this.handleKeyDown.bind(this)}
            />
            </Dialog>
         </MuiThemeProvider>
      );
   }
}

TaskCreateModal.propTypes = {
   isOpen: React.PropTypes.bool,
   onSubmit: React.PropTypes.func,
   onClose: React.PropTypes.func
}

export default TaskCreateModal;
