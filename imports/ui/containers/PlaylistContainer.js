import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/channels.js';
import { ChannelSongs } from '../../api/channelSongs/channelSongs.js';
import { Songs } from '../../api/Songs/methods.js';
import { SearchResults } from '../../api/Songs/searchResultMethods.js';

import Playlist from '../pages/Playlist.jsx';

export default PlaylistContainer = createContainer(({_id}) => {
  Meteor.subscribe('channels');
  const channelSongHandle = Meteor.subscribe('channelSongs');
  const loading = !channelSongHandle.ready();

  let searchValue = Session.get('searchVal');
// console.log('containerID', _id);
  Meteor.subscribe('songs', searchValue);

  //Get the channel information for the channel matching the id in the url
  const singleChannel = Channels.find({_id: _id}).fetch();

  //Get an array of songs matching the current channel
  const relevantChannelSongs = ChannelSongs.find({channelId: _id}).fetch();

  //Get an array of search results based on search value
  // const searchResults = Songs.find().fetch();
  const searchResults = SearchResults.find().fetch();

  //Get a count of channel songs for order incrementing
  const countOfChannelSongs = ChannelSongs.find({channelId: _id}).count();
    // artist filter: {artistName: searchVal}
  return {
    searchResults: searchResults,
    channelSong: relevantChannelSongs,
    channels: singleChannel,
    loading,
    countOfChannelSongs: countOfChannelSongs,
    currentUser: Meteor.user(),
  };
}, Playlist);
