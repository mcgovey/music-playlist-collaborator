import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const UserProps = new Mongo.Collection('userProps');

console.log('Meteor.users', Meteor.users.find().fetch());

Meteor.methods({
    'userList.insert': function (  ) {
        return UserProps.insert({
            userId       	: Meteor.userId(),
            username        : Meteor.users.findOne(Meteor.userId()).username,
            createdAt_dt    : new Date(),
            lastLogin_dt   	: new Date(),

        });
    }
//what attributes do we want?
/*
Name
Spotify ID
Email address
Phone Number
Is Premium?
*/
});
