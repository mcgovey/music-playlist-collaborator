import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

import { Songs } from '../../Songs/methods.js';
import { ExternalPlaylists } from '../../playlists/playlistMethods.js';

// when storage is not at a premium, store spotify responses
// export const SpotifyResponses = new Mongo.Collection('spotifyResponses');

// Meteor.publish('spotifyResponses', function spotifyResponsesPublication() {
//   return SpotifyResponses.find({});
// });

Meteor.methods({
  searchTracks: function ( searchPattern ) {
// console.log('invoked');

//***********add code to run song collection with query param and count results

  // console.log('in collection results', Songs.find().count());

    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.searchTracks(searchPattern, { limit : 5, offset : 1 });

    //check if error was returned above
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.searchTracks(searchPattern, { limit : 5, offset : 1 });
    }
// console.log('songs', Songs.findOne());
// console.log('search response', response.data.body.tracks.items);

    // SpotifyResponses.insert({
    //   type: 'searchTracks',
    //   response,
    //   createdAt: new Date(),
    //   owner: this.userId,
    //   username: Meteor.users.findOne(this.userId).username,
    // });

    // error handle here instead of ternary response

    // console.log('spotify response', response.data.body.tracks);

    if ( response.data.body.tracks ) {
      //insert responses into songs collection
      var responseItems = response.data.body.tracks.items;

      //store search results to collection for later potential optimization
      // Meteor.call('songs.insert', responseItems);

    }

    return responseItems ? responseItems : response;
  },
  'spotify.getCurrUserPlaylists': function () {

    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getUserPlaylists(Meteor.user().profile.id, {});

    //check if error was returned above
    if (checkTokenRefreshed(response, spotifyApi)) {
    var response = spotifyApi.getUserPlaylists(Meteor.user().profile.id, {});
    }

    // SpotifyResponses.insert({
    //   type: 'getCurrUserPlaylists',
    //   response,
    //   createdAt: new Date(),
    //   owner: this.userId,
    //   username: Meteor.users.findOne(this.userId).username,
    // });


    if ( response.data.body ) {
      //insert responses into songs collection
      var responseItems = response.data.body.items;

      Meteor.call('externalPlaylists.remove', this.userId);

      Meteor.call('externalPlaylists.insert', responseItems);
    }



    return responseItems ? responseItems : response;
  },
  'spotify.getPlaylistTracks': function (playlist) {
// console.log('playlist', playlist);
    check(playlist, Object);
    let playlistId  = playlist.spotifyId,
        channelId   = playlist._id;
// console.log('playlist', playlist);
    check(playlistId, String);
    check(channelId, String);
// console.log('spotifyid', playlistId);

    var spotifyApi = new SpotifyWebApi();
// console.log('spotifyApi', spotifyApi);
    var response = spotifyApi.getPlaylistTracks(Meteor.user().profile.id, playlistId, {});

    //check if error was returned above
    if (checkTokenRefreshed(response, spotifyApi)) {
      var response = spotifyApi.getPlaylistTracks(Meteor.user().profile.id, playlistId, {});
    }
console.log('user', Meteor.user().profile.id, 'playlist',playlistId ,'response', response);
    // SpotifyResponses.insert({
    //   type: 'getPlaylistTracks',
    //   response,
    //   createdAt: new Date(),
    //   owner: this.userId,
    //   username: Meteor.users.findOne(this.userId).username,
    // });

    if ( response.data.body ) {
      //insert responses into songs collection
      var responseItems = response.data.body.items;

      responseItems.map((item) => {
        Meteor.call('songs.insert', responseItems, function (error, result) {
console.log('returned err', error, 'res', result);
          //Meteor.call('channelSongs.insert', channelId, Songs.findOne(result));
      // go to the newly created channel
        });

        // 
      });
    }

    return responseItems ? responseItems : response;
  }

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
