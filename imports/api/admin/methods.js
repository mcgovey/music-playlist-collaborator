import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

// import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';
import { Songs } from '../Songs/methods.js';
import { Channels } from '../channels/channels.js';
import { ChannelSongs } from '../channelSongs/channelSongs.js';
import { ExternalPlaylists } from '../playlists/playlistMethods.js';

// export const Songs = new Mongo.Collection('songs');
export const UserDirectory = new Mongo.Collection('allUsers');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('userCollection', function () {
    var self = this;
    var handle = Meteor.users.find({}, {
      fields: {emails: 1, profile: 1}
    }).observeChanges({
      added: function (id, fields) {
        self.added('allUsers', id, fields);
      },
      changed: function (id, fields) {
        self.changed('allUsers', id, fields);
      },
      removed: function (id) {
        self.removed('allUsers', id);
      }
    });

    self.ready();

    self.onStop(function () {
      handle.stop();
    });

  });
  Meteor.publish('allChannels', function() {
    return Channels.find();
  });
  Meteor.publish('allChannelSongs', function() {
    return ChannelSongs.find();
  });
  Meteor.publish('allPlaylists', function() {
    return ExternalPlaylists.find();
  });
  Meteor.publish('allSongs', function() {
    return Songs.find();
  });
}

Meteor.methods({
  'channelSongs.removeAllChannelSongs'() {
    ChannelSongs.remove({});
  },
  'songs.dump': function () {
    Songs.remove({});
  },
});