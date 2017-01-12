import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import SessionActions from '../actions/SessionActions.js';
import LoginPage from '../components/LoginPage.jsx';

class LoginPageContainer extends React.Component {
   componentDidMount() {
      if (this.props.isLoggedIn) {
         this.redirectLoggedInUser();
      }
   }

   componentWillUpdate(nextProps, nextState) {
      if (nextProps.isLoggedIn) {
         this.redirectLoggedInUser();
      }
   }

   redirectLoggedInUser() {
      const { location } = this.props;
      if (location.state && location.state.nextPathname) {
         this.props.router.replace(location.state.nextPathname);
      } else {
         this.props.router.replace('/lists');
      }
   }

   handleLogIn() {
      this.props.SessionActions.authorize();
   }

   render() {
      return (
         <LoginPage
            onLogIn={this.handleLogIn.bind(this)}
         />
      );
   }
}

function mapStateToProps(store) {
   return {
      isLoggedIn: store.auth.isLoggedIn
   }
}

function mapDispatchToProps(dispatch) {
   return {
      SessionActions: bindActionCreators(SessionActions, dispatch)
   }
}

LoginPageContainer.propTypes = {
   isLoggedIn: React.PropTypes.bool,
   SessionActions: React.PropTypes.object,
   router: React.PropTypes.object.isRequired
}

const wrappedComponent = withRouter(LoginPageContainer);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
