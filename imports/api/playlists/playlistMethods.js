import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

// import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

export const ExternalPlaylists = new Mongo.Collection('externalPlaylists');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish( 'externalPlaylists', function() {
    return ExternalPlaylists.find( {'owner': this.userId} );
  });
}

Meteor.methods({
  'externalPlaylists.insert': function ( playlistResponse ) {
    // console.log('method found', songsResponse, 'this', this);
    playlistResponse.map((playlist) => {
      let spotifyPlaylistID = playlist.id;

// console.log('playlist', spotifyPlaylistID);

      ExternalPlaylists.insert({
        spotifyId : playlist.id,
        collaborative : playlist.collaborative,
        link          : playlist.href,
        channelName   : playlist.name,
        ownerId       : playlist.owner.id,
        public        : playlist.public,
        trackCount    : playlist.tracks.total,
        type          : playlist.type,
        storedAt      : new Date(),
        owner         : this.userId,
        username      : Meteor.users.findOne(this.userId).username,
      });
    });
    // for (var i = 0; i < songsResponse.length; i++) {
    //   // get spotify ID of track
    //   let spotifyTrackID = songsResponse[i].id;

    //   // check if track exists in db, insert if not
    //   if (!Songs.findOne({trackID: spotifyTrackID})) {
    //     Songs.insert({
    //       trackID     : songsResponse[i].id,
    //       trackName   : songsResponse[i].name,
    //       albumID     : songsResponse[i].album.id,
    //       albumName   : songsResponse[i].album.name,
    //       artistID    : songsResponse[i].artists[0].id,
    //       artistName  : songsResponse[i].artists[0].name,
    //       duration    : songsResponse[i].duration_ms,
    //       createdAt   : new Date(),
    //       owner       : this.userId,
    //       username    : Meteor.users.findOne(this.userId).username,
    //     });
    //   }
    // }
  },
  'externalPlaylists.dump': function (userId) {
console.log('findall',ExternalPlaylists.find( {'owner': this.userId} ).fetch());
    ExternalPlaylists.remove({'owner': userId});
  }
});
