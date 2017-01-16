import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import TaskListsActions from '../actions/TaskListsActions.js';
import TaskListsPage from '../components/TaskListsPage.jsx';
import TaskListCreateModal from '../components/TaskListCreateModal.jsx';

class TaskListsPageContainer extends React.Component {
   constructor() {
      super();
      this.state = { isCreatingTaskList: false }
   }

   componentWillMount() {
      this.props.TaskListsActions.loadTaskLists();
   }

   changeRoute(taskId) {
      this.props.router.push(`/lists/${taskId}`);
   }

   handleTaskListSubmit(taskList) {
      this.props.TaskListsActions.createTaskList(taskList);
      this.handleTaskListCreateModalClose();
   }

   handleAddTaskList() {
      this.setState({ isCreatingTaskList: true });
   }

   handleTaskListCreateModalClose() {
      this.setState({ isCreatingTaskList: false });
   }

   render() {
      return (
         <div>
            <TaskListsPage
               taskLists={this.props.taskLists}
               currentTaskListId={this.props.params.id}
               children={this.props.children}
               onRouteChange={this.changeRoute.bind(this)}
               onAddTaskList={this.handleAddTaskList.bind(this)}
            />
            <TaskListCreateModal
               isOpen={this.state.isCreatingTaskList}
               onSubmit={this.handleTaskListSubmit.bind(this)}
               onClose={this.handleTaskListCreateModalClose.bind(this)}
            />
         </div>
      );
   }
}

function mapStateToProps(store) {
   return {
      taskLists: store.taskLists.taskLists
   }
}

function mapDispatchToProps(dispatch) {
   return {
      TaskListsActions: bindActionCreators(TaskListsActions, dispatch)
   }
}

TaskListsPageContainer.propTypes = {
   taskLists: React.PropTypes.array,
   children: React.PropTypes.object,
   router: React.PropTypes.object.isRequired,
   TaskListsActions: React.PropTypes.object
}

const wrappedComponent = withRouter(TaskListsPageContainer);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
