import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// Channel component - represents a single Channel item
export default class SongSearchResultsItem extends Component {
  // toggleChecked() {
  //   // Set the checked property to the opposite of its current value
  //   Meteor.call('channels.setChecked', this.props.channel._id, !this.props.channel.checked);
  // }

  addToChannelSong() {
    let channelId = this.props.channel._id, song = this.props.song;
    // console.log('channel',channel, 'song',song);
    Meteor.call('channelSongs.insert', channelId, song);
  }

  // togglePrivate() {
  //   Meteor.call('channels.setPrivate', this.props.channel._id, ! this.props.channel.private);
  // }

  render() {
    // Give channels a different className when they are checked off,
    // so that we can style them nicely in CSS
    // const channelClassName = classnames({
    //   checked: this.props.channel.checked,
    //   private: this.props.channel.private,
    // });
    let song = this.props.song;

    return (
      <li onClick={this.addToChannelSong.bind(this)}>
          {song.trackName} by {song.artistName}
      </li>
    );
  }
}

SongSearchResultsItem.propTypes = {
  // This component gets the channel to display through a React prop.
  // We can use propTypes to indicate it is required
  song: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
};
