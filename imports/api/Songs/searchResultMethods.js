import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const SearchResults = new Mongo.Collection('searchResults', {connection: null});

Meteor.methods({
    'searchResults.insert': function ( songsResponse ) {
// console.log('accessing search method', SearchResults.find().fetch());
        return SearchResults.insert({
            trackID     : songsResponse.id,
            trackName   : songsResponse.name,
            albumID     : songsResponse.album.id,
            albumName   : songsResponse.album.name,
            artistID    : songsResponse.artists[0].id,
            artistName  : songsResponse.artists[0].name,
            duration    : songsResponse.duration_ms,
            createdAt   : new Date(),
            owner       : Meteor.userId(),
            username    : Meteor.users.findOne(Meteor.userId()).username,
        });
    },
    'searchResults.clear': function () {
        SearchResults.remove({});
    }
// 	'songs.insert': function ( songsResponse ) {
// // console.log('method found', songsResponse, 'this', this);
// 		// let songInsertIds = [];
// 		for (var i = 0; i < songsResponse.length; i++) {
// 			// get spotify ID of track
// 			let spotifyTrackID = songsResponse[i].id;

// console.log('ids', spotifyTrackID, 'song in list', Songs.findOne({trackID: spotifyTrackID}));
// 			// check if track exists in db, insert if not
// 			if (!Songs.findOne({trackID: spotifyTrackID})) {
// 				// songInsertIds.push(
// 				// )
				
// 				Songs.insert({
// 					trackID     : songsResponse[i].id,
// 					trackName   : songsResponse[i].name,
// 					albumID     : songsResponse[i].album.id,
// 					albumName   : songsResponse[i].album.name,
// 					artistID    : songsResponse[i].artists[0].id,
// 					artistName  : songsResponse[i].artists[0].name,
// 					duration    : songsResponse[i].duration_ms,
// 					createdAt   : new Date(),
// 					owner       : this.userId,
// 					username    : Meteor.users.findOne(this.userId).username,
// 				})
// 			}
// 			// return songInsertIds;
// 		}
//   },

});
