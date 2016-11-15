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
    });
  });
}

Meteor.methods({
  'channelSongs.removeAllChannelSongs'() {
    ChannelSongs.remove({});
  },
  'channelSongs.insert'(channelId, text) {
    check(channelId, String);
    check(text, Object);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    text.channelId  = channelId;
    text.createdAt  = new Date();
    text.owner      = this.userId;
    text.username   = Meteor.users.findOne(this.userId).username;

    ChannelSongs.insert(
      text
    );
  },
  'channelSongs.remove'(taskId) {
    check(taskId, String);

    const task = ChannelSongs.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    ChannelSongs.remove(taskId);
  },
});
