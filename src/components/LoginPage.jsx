import React from 'react';

const LoginPage = props => (
   <div className="LoginPage">
      <h1 className="LoginPage__title">Google Task</h1>
      <p className="LoginPage__text">Organize your life</p>
      <button className="LoginPage__button" onClick={props.onLogIn}>Log In</button>
   </div>
);

LoginPage.propTypes = {
   onLogIn: React.PropTypes.func
}

export default LoginPage;
