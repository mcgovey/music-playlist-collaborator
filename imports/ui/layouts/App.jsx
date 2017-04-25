import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


import Nav from '../components/nav.jsx';

// import styles from '../styles/bootstrap-base.min.css';
// import stylesLab from '../styles/bootstrap-spacelab.min.css';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <div className="container">

        <Nav />

        {this.props.content}

      </div>
    );
  }
}
