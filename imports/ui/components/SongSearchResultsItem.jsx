import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// Channel component - represents a single Channel item
export default class SongSearchResultsItem extends Component {

  //add songs to channelSongs collections
  addToChannelSong() {
    let channelId = this.props.channel._id, song = this.props.song;
    Meteor.call('channelSongs.insert', channelId, song);
  }

  render() {
    //store songs for iterating in render
    let song = this.props.song;

    return (
      <a href="#" className="list-group-item list-group-item-action" onClick={this.addToChannelSong.bind(this)}>
          {song.trackName} by {song.artistName}
      </a>
    );
  }
}

SongSearchResultsItem.propTypes = {
  // This component gets the channel to display through a React prop.
  // We can use propTypes to indicate it is required
  song: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
};
