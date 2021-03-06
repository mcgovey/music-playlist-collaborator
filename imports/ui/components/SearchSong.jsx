import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import '../../api/Songs/methods.js';
import '../../api/Songs/searchResultMethods.js';

// Channels component - represents the rendering of channels
export default class SearchSong extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.searchInput).value.trim();
    // set a session var to search the Song collection later
    Session.set('searchVal',text);

    // call the search tracks method to insert results in to the DB
    if (Meteor.isClient) {
		Meteor.call('searchTracks', text, function(err, response) {
// console.log('searchResponse', response, 'potential error', err);
			if (response) {
				//clear existing results
				Meteor.call('searchResults.clear');
				//add new results
				response.map((songsResponse) => {
					Meteor.call('searchResults.insert', songsResponse);
// console.log('insertResponse id', insertResponse);
// 				return insertResponse;
				});
			// window.SearchResults = SearchResults;
// console.log('inserted songs', insertIds, 'searchResults');
			}
		});
    }
  }
  //
  // handleSpotifySearch() {
  //   console.log('clicks');
  //
  //   //call spotify search method
  //
  //   //check if result exists in songs Collection
  //
  //   //if song does not exist add to collection
  // }

  render() {

          // {console.log('channel props',this.props)}
          // goes below if you want to add button for more results
          // <a href="#" id="searchSpotifyBtn" onClick={this.handleSpotifySearch.bind(this)}>Search Spotify</a>
    return (
      <div className="componentWrapper">


        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
          <input
            className="form-control"
            type="text"
            ref="searchInput"
            placeholder="Search for a song"
          />
        </form>





      </div>

    );
  }

};
