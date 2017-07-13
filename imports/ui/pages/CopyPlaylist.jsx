import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import {ExternalPlaylists} from '../../api/playlists/playlistMethods.js';

// Channels component - represents the rendering of channels
export default class CopyPlaylist extends Component {
  componentDidMount() {
    Meteor.call('spotify.getCurrUserPlaylists', function(err, response) {
// console.log('copyResponse: ', response, 'error:', err);

    });
  }
  handleClick(playlist, event) {
    event.preventDefault();
// console.log('clicked', event, playlist);
    // // Find the text field via the React ref
    // const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    playlist._id = Random.id();

console.log('random id', playlist);
    Meteor.call('spotify.getPlaylistTracks', playlist, function (error, result) {
console.log('returned err', error, 'res', result);
      // go to the newly created channel
      // FlowRouter.go('/channel/' + result);
    });

    Meteor.call('channels.insert', playlist, function (error, result) {
// console.log('returned err', error, 'res', result);
      // go to the newly created channel
      FlowRouter.go('/channel/' + result);
    });

  }
  renderPlaylists() {
// console.log('Playlist Props',this.props);
    // this.getPlaylists();

    let filteredPlaylists = this.props.playlists;
    return filteredPlaylists.map((playlist) => {
// console.log('playlist', playlist);
      const plName = playlist.channelName;
      return (
        <a 
          href="#" 
          className="list-group-item"
          key={playlist._id}
          onClick={this.handleClick.bind(this, playlist)}
          >
          {plName}
        </a>
        )
    });

    // let filteredChannels = this.props.channels;
    // if (this.state.hideCompleted) {
    //   filteredChannels = filteredChannels.filter(channel => !channel.checked);
    // }
    // return filteredChannels.map((channel) => {
    //   const currentUserId = this.props.currentUser && this.props.currentUser._id;
    //   const showPrivateButton = channel.owner === currentUserId;

    //   return (
    //     <ChannelItem
    //       key={channel._id}
    //       channel={channel}
    //       showPrivateButton={showPrivateButton}
    //     />
    //   );
    // });
  }

  render() {

          // {console.log('channel props',this.props)}
          // goes below if you want to add button for more results
          // <a href="#" id="searchSpotifyBtn" onClick={this.handleSpotifySearch.bind(this)}>Search Spotify</a>
    return (
      <div className="componentWrapper">

        <h3 className="text-center">Copy from a playlist</h3>

        <div className="list-group">
          {this.renderPlaylists()}
        </div>

        <h4>Search for another playlist</h4>


      </div>

    );
  }

};

CopyPlaylist.propTypes = {
  playlists: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
