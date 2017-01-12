import React from 'react';

const LoggedInLayout = props => (
   <div>
      {props.children}
   </div>
);

LoggedInLayout.propTypes = {
   children: React.PropTypes.object
}

export default LoggedInLayout;
