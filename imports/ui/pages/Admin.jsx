import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// Admin component - all details associated with admin page
export default class Admin extends Component {
    outputDetails(details) {
console.log( 'full record', this ); 
    }
  renderSongs() {
console.log('admin props',this.props);
    let filteredSongs = this.props.allSongs;


    return filteredSongs.map((song, i) => {

      return (
        <tr
          key={song._id}
          data-id={song._id}
          onClick={this.outputDetails.bind(song)}
        >
          <td>{song._id}</td>
          <td>{song.trackName}</td>
          <td>{song.artistName}</td>
          <td>{song.owner}</td>
        </tr>
      );
    });  

  }
  renderUsers() {
    let filteredUsers = this.props.allUsers;

// console.log('filteredUsers',filteredUsers);

    return filteredUsers.map((user, i) => {

      return (
        <tr
          key={user._id}
          onClick={this.outputDetails.bind(user)}
        >
          <td>{user._id}</td>
          <td>{user.profile.id}</td>
          <td>{user.profile.email}</td>
        </tr>
      );
    });  

  }
  renderChannels() {
    let filteredChannels = this.props.allChannels;

    return filteredChannels.map((channel, i) => {

      return (
        <tr
          key={channel._id}
          onClick={this.outputDetails.bind(channel)}
        >
          <td>{channel._id}</td>
          <td>{channel.channelName}</td>
          <td>{channel.owner}</td>
        </tr>
      );
    });  
  }

  renderChannelSongs() {
    let filteredChannelSongs = this.props.allChannelSongs;

    return filteredChannelSongs.map((channelSong, i) => {

      return (
        <tr
          key={channelSong._id}
          onClick={this.outputDetails.bind(channelSong)}
        >
          <td>{channelSong._id}</td>
          <td>{channelSong.channelId}</td>
          <td>{channelSong.trackName}</td>
          <td>{channelSong.artistName}</td>
          <td>{channelSong.owner}</td>
        </tr>
      );
    });  
  }
  renderExternalPlaylists() {
    let filteredExPlaylists = this.props.allExPlaylists;

    return filteredExPlaylists.map((playlist, i) => {

      return (
        <tr
          key={playlist._id}
          onClick={this.outputDetails.bind(playlist)}
        >
          <td>{playlist._id}</td>
          <td>{playlist.channelName}</td>
          <td>{playlist.owner}</td>
        </tr>
      );
    });  
  }

  render() {


    return (
      <div className="componentWrapper">
      <h3>Admin Page</h3>

      <h4>Songs</h4>
      <table className="table table-hover table-bordered">
      
        <thead>
          <tr>
            <td>ID</td>
            <td>Track Name</td>
            <td>Artist</td>
            <td>Owner</td>
          </tr>
        </thead>
        <tbody>
          {this.renderSongs()}
        </tbody>
      </table>

      <h4>Users</h4>
      <table className="table table-hover table-bordered">
      
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {this.renderUsers()}
        </tbody>
      </table>

      <h4>Channels</h4>
      <table className="table table-hover table-bordered">
      
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Owner</td>
          </tr>
        </thead>
        <tbody>
          {this.renderChannels()}
        </tbody>
      </table>

      <h4>Channel Songs</h4>
      <table className="table table-hover table-bordered">
      
        <thead>
          <tr>
            <td>ID</td>
            <td>Channel ID</td>
            <td>Track Name</td>
            <td>Artist</td>
            <td>Owner</td>
          </tr>
        </thead>
        <tbody>
          {this.renderChannelSongs()}
        </tbody>
      </table>

      <h4>Extenal Playlists</h4>
      <table className="table table-hover table-bordered">
      
        <thead>
          <tr>
            <td>ID</td>
            <td>Playlist Name</td>
            <td>Owner</td>
          </tr>
        </thead>
        <tbody>
          {this.renderExternalPlaylists()}
        </tbody>
      </table>
      </div>

    );
  }
};

Admin.propTypes = {
  allSongs: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
