import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

import { Songs } from '../imports/api/Songs/methods.js';

export const SpotifyResponses = new Mongo.Collection('spotifyResponses');

Meteor.publish('spotifyResponses', function spotifyResponsesPublication() {
  return SpotifyResponses.find({});
});

Meteor.methods({
  searchTracks: function ( searchPattern ) {
// console.log('invoked');

//***********add code to run song collection with query param and count results

  console.log('in collection results', Songs.find().count());

    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.searchTracks(searchPattern, { limit : 5, offset : 1 });

    //check if error was returned above
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.searchTracks(searchPattern, { limit : 5, offset : 1 });
    }
// console.log('songs', Songs.findOne());
// console.log('search response', response.data.body.tracks.items);

    SpotifyResponses.insert({
      response,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });

    // error handle here instead of ternary response

    if ( response.data.body.tracks ) {
      //insert responses into songs collection
      var responseItems = response.data.body.tracks.items;

      Meteor.call('songs.insert', responseItems);
    }

    return responseItems ? responseItems : response;
  },
});


var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
};

ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": "4b14d422c06a412488687ccbafe33891",
      "secret": "d854f0c76a834eabb6ab3b8cd6c73074"
    }
  },
  { upsert: true }
);
