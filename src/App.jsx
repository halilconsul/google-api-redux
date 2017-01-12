import React from 'react';
//
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

class App extends React.Component {
   render() {
      return (
         <div>
            {this.props.children}
         </div>
      );
   }
}

export default App;
