import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddButton from 'material-ui/svg-icons/content/add-circle-outline';
import MenuIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import './Task.scss';

class Task extends React.Component {
   handleCheck() {
      this.props.onStatusChange({
         isCompleted: !this.props.isCompleted
      });
   }

   render() {
      return (
         <MuiThemeProvider>
            <div className="Task">
               <Checkbox
                  className="Task__checkbox"
                  checked={this.props.isCompleted}
                  onCheck={this.handleCheck.bind(this)}
               />
               <div className="Task__text">
                  {this.props.text}
               </div>
                  <RaisedButton
                     className="Task_buttons"
                     primary={true}
                     icon={<ContentEdit/>}
                  />
                  <RaisedButton
                     className="Task_buttons"
                     secondary={true}
                     icon={<ContentDelete/>}
                  />
            </div>
         </MuiThemeProvider>
      )
   }
}

Task.propTypes = {
   text: React.PropTypes.string,
   note: React.PropTypes.string,
   due: React.PropTypes.string,
   isCompleted: React.PropTypes.bool,
   onStatusChange: React.PropTypes.func
}


export default Task;
