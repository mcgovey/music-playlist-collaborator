import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


import { Songs } from '../../api/Songs/methods.js';
import { Channels } from '../../api/channels/channels.js';
import { ChannelSongs } from '../../api/channelSongs/channelSongs.js';
import { UserDirectory } from '../../api/admin/methods.js';

// import { Channels } from '../../api/channels/channels.js';
// import { ChannelSongs } from '../../api/channelSongs/channelSongs.js';
// import { Songs } from '../../api/Songs/methods.js';

import Admin from '../pages/Admin.jsx';

export default AdminContainer = createContainer(() => {
  Meteor.subscribe('allSongs');
  Meteor.subscribe('userCollection');
  Meteor.subscribe('allChannelSongs');
  Meteor.subscribe('allChannels');

  const allSongs = Songs.find().fetch();
// console.log('songs', allSongs);

  const allUsers = UserDirectory.find().fetch();
console.log('users', allUsers);

  const allChannelSongs = ChannelSongs.find().fetch();
console.log('channelSongs', allChannelSongs);

  const allChannels = Channels.find().fetch();
console.log('allChannels', allChannels);

  return {
    allSongs,
    allUsers,
    allChannelSongs,
    allChannels,
    currentUser: Meteor.user(),
  };
}, Admin);