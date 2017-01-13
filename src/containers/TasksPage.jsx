import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TasksPage from '../components/TasksPage.jsx';
import TasksActions from '../actions/TasksActions.js';

class TasksPageContainer extends React.Component {
   componentWillMount() {
      this.props.TasksActions.loadTasks(this.props.params.id);
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.params.id !== this.props.params.id) {
         this.props.TasksActions.loadTasks(nextProps.params.id);
      }
   }

   handleTaskStatusChange(taskId, { isCompleted }) {
      this.props.TasksActions.updateTaskStatus({
         taskListId: this.props.params.id,
         taskId: taskId,
         isCompleted: isCompleted
      });
   }

   render() {
      return (
         <TasksPage
            tasks={this.props.tasks}
            onTaskStatusChange={this.handleTaskStatusChange.bind(this)}
         />
      )
   }
}

function mapStateToProps(store) {
   return {
      tasks: store.tasks.tasks
   }
}

function mapDispatchToProps(dispatch) {
   return {
      TasksActions: bindActionCreators(TasksActions, dispatch)
   }
}

TasksPageContainer.propTypes = {
   tasks: React.PropTypes.array,
   TasksActions: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPageContainer);
