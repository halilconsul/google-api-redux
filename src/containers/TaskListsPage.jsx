import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import TaskListsActions from '../actions/TaskListsActions.js';
import TaskListsPage from '../components/TaskListsPage.jsx';

class TaskListsPageContainer extends React.Component {
   componentWillMount() {
      this.props.TaskListsActions.loadTaskLists();
   }

   changeRoute(taskId) {
      this.props.router.push(`/lists/${taskId}`);
      // console.log(taskId);
   }

   render() {
      return (
         <TaskListsPage
            taskLists={this.props.taskLists}
            onRouteChange={this.changeRoute.bind(this)}
         />
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
   TaskListsActions: React.PropTypes.object
}

const wrappedComponent = withRouter(TaskListsPageContainer);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
