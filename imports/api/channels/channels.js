import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Channels = new Mongo.Collection('channels');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish channels that are public or belong to the current user
  Meteor.publish('channels', function channelsPublication() {
    return Channels.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
  Meteor.publish('singleChannel', function(id) {
    check(id, String);
    return Channels.find({_id: id});
  });
  Meteor.publish('allChannels', function() {
    return Channels.find();
  });
}

Meteor.methods({
  'channels.insert'(text) {
    check(text, Object);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const channelText = {
      channelName : text.channelName,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    };

    return Channels.insert(channelText);
  },
  'channels.remove'(taskId) {
    check(taskId, String);

    const task = Channels.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Channels.remove(taskId);
  },
  'channels.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Channels.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Channels.update(taskId, { $set: { checked: setChecked } });
  },
  'channels.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Channels.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Channels.update(taskId, { $set: { private: setToPrivate } });
  },
});
