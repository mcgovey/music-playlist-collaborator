import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import { Tasks } from '../api/tasks.js';
//
// import Task from './Task.jsx';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

// import NewChannel from './NewChannel.jsx';

// App component - represents the whole app
export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     hideCompleted: false,
  //   };
  // }

  // toggleHideCompleted() {
  //   this.setState({
  //     hideCompleted: !this.state.hideCompleted,
  //   });
  // }


  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
        </header>

        {this.props.content}

      </div>
    );
  }
}

// App.propTypes = {
//   currentUser: PropTypes.object,
// };
//
// export default createContainer(() => {
//
//   return {
//     currentUser: Meteor.user(),
//   };
// }, App);
