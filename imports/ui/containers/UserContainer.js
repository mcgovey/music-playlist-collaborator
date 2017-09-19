import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { UserProps } from '../../api/users/userMethods.js';
import NewUser from './../pages/NewUser.jsx';

export default ChannelListContainer = createContainer(() => {
  Meteor.subscribe('userProps');
console.log('user container called', Meteor.user());
  return {
    userProps: UserProps.find({userId: Meteor.user()}).fetch(),
    currentUser: Meteor.user(),
  };
}, NewUser);
