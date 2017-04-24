import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { ExternalPlaylists } from '../../api/playlists/playlistMethods.js';
import CopyPlaylist from './../pages/CopyPlaylist.jsx';

export default CopyPlaylistContainer = createContainer(() => {
  Meteor.subscribe('externalPlaylists');

  return {
    playlists: ExternalPlaylists.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, CopyPlaylist);
