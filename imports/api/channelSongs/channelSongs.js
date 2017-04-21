import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ChannelSongs = new Mongo.Collection('channelSongs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('channelSongs', function tasksPublication() {
    return ChannelSongs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    }, { sort: { order: 1 } });
  });
  Meteor.publish('allChannelSongs', function() {
    return ChannelSongs.find();
  });
}

Meteor.methods({
  'channelSongs.removeAllChannelSongs'() {
    ChannelSongs.remove({});
  },
  'channelSongs.insert'(channelId, text) {
// console.log('insert method id',channelId,'text',text,'find', ChannelSongs.find({channelId: channelId}));
    check(channelId, String);
    check(text, Object);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let song = {
      'albumID'   : text.albumID,
      'albumName' : text.albumName,
      'artistID'  : text.artistID,
      'artistName': text.artistName,
      'duration'  : text.duration,
      'trackID'   : text.trackID,
      'trackName' : text.trackName,
      'order'     : text.order
    };

    song.channelId  = channelId;
    song.createdAt  = new Date();
    song.owner      = this.userId;
    song.username   = Meteor.users.findOne(this.userId).username;

    ChannelSongs.insert( song );
  },
  'channelSongs.remove'(channelSongId) {
    check(channelSongId, String);

    const track = ChannelSongs.findOne(channelSongId);
    if (track.private && track.owner !== this.userId) {
      // If the track is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    ChannelSongs.remove(channelSongId);
  },
});
