import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


// import { Channels } from '../../api/channels/channels.js';
// import { ChannelSongs } from '../../api/channelSongs/channelSongs.js';
// import { Songs } from '../../api/Songs/methods.js';

import LandingPage from '../pages/LandingPage.jsx';

export default LandingPageContainer = createContainer(() => {


  return {
    currentUser: Meteor.user(),
  };
}, LandingPage);
