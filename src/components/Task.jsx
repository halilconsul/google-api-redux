import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import CompleteIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import './Task.scss';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class Task extends React.Component {
   constructor() {
      super();
      this.state = { isEditing: false }
   }

   handleCheck() {
      this.props.onStatusChange({
         isCompleted: !this.props.isCompleted
      });
   }

   handleEdit() {
      this.setState({ isEditing: true }, this.focusInput);
   }

   handleSave() {
      this.props.onUpdate({ text: this.input.value });
      this.handleEditorClose();
   }

   handleKeyDown(e) {
      if (e.keyCode === ENTER_KEY) {
         this.handleSave();
      }
      if (e.keyCode === ESC_KEY) {
         this.handleEditorClose();
      }
   }

   handleEditorClose() {
      this.setState({ isEditing: false });
   }

   focusInput() {
      this.input.focus();
   }

   renderEditedButtons() {
      return (
         <div className="Task__control">
            <IconButton
               tooltip="Save"
               tooltipPosition="bottom-right"
               iconStyle={{ color: 'grey' }}
               onClick={this.handleSave.bind(this)}
            >
               <CompleteIcon />
            </IconButton>

            <IconButton
               tooltip="Cancel"
               tooltipPosition="bottom-right"
               iconStyle={{ color: 'grey' }}
               onClick={this.handleEditorClose.bind(this)}
            >
               <CancelIcon />
            </IconButton>
         </div>
      )
   }

   renderTaskEdited() {
      return (
         <div className="Task Task__editing">
            <input
               type="text"
               className="Task__input"
               defaultValue={this.props.text}
               ref={c => this.input = c}
               onKeyDown={this.handleKeyDown.bind(this)}
            />
            { this.renderEditedButtons() }
         </div>
      );
   }

   renderDefaultButtons() {
      return (
         <div className="Task__control">
            <IconButton
               tooltip="Edit"
               tooltipPosition="bottom-right"
               iconStyle={{ color: 'grey' }}
               onClick={this.handleEdit.bind(this)}
            >
               <ContentEdit />
            </IconButton>
            <IconButton
               tooltip="Delete"
               tooltipPosition="bottom-right"
               iconStyle={{ color: 'grey' }}
               onClick={this.props.onDelete}
            >
               <ContentDelete />
            </IconButton>
         </div>
      )
   }

   renderTaskCompleted() {
      return (
         <div className="Task">
            <Checkbox
               className="Task__checkbox"
               checked={this.props.isCompleted}
               onCheck={this.handleCheck.bind(this)}
            />
            <div className="Task__text">
               {this.props.text}
            </div>
            {this.renderDefaultButtons()}
         </div>
      );
   }

   renderTask() {
      if (this.state.isEditing) {
         return this.renderTaskEdited()
      } else {
         return this.renderTaskCompleted()
      }
   }

   render() {
      return (
         <MuiThemeProvider>
            {this.renderTask()}
         </MuiThemeProvider>
      );
   }
}

Task.propTypes = {
   text: React.PropTypes.string,
   note: React.PropTypes.string,
   due: React.PropTypes.string,
   isCompleted: React.PropTypes.bool,
   onStatusChange: React.PropTypes.func,
   onUpdate: React.PropTypes.func,
   onDelete: React.PropTypes.func
}


export default Task;
