import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';

// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Songs } from '../api/Songs/methods.js';
// import Task from './Task.jsx';

//probably not needed
// import { channelSongs } from '../api/channelSongs/channelSongs.js';
import ChannelSong            from './components/ChannelSong.jsx';
import SongSearchResultsItem  from './components/SongSearchResultsItem.jsx';
import SearchSong             from './components/SearchSong.jsx';

// Channels component - represents the rendering of channels
export default class Channel extends Component {

//   renderTasks() {
// // console.log('channelSongs Props', this.props);
//     let filteredTasks = this.props.tasks;
//     // if (this.state.hideCompleted) {
//     //   filteredTasks = filteredTasks.filter(task => !task.checked);
//     // }
//     return filteredTasks.map((task) => {
//       const currentUserId = this.props.currentUser && this.props.currentUser._id;
//       const showPrivateButton = task.owner === currentUserId;
//
//       return (
//         <Task
//           key={task._id}
//           task={task}
//           showPrivateButton={showPrivateButton}
//         />
//       );
//     });
//   }
  renderChannelSongs(){

    let filteredChannelSongs = this.props.channelSong;

    let currentChannel = this.props.channels[0];
// console.log('searchresultsplaylist', currentChannel, "filteredSongs", filteredSongs);

    return filteredChannelSongs.map((channelSong) => {
      //--------------this should be passed to the component as well for "who added this" validation
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
// console.log('iteratingSong', song);
      return (
        <ChannelSong
          key={channelSong._id}
          channel={currentChannel}
          channelSong={channelSong}
        />
      );
    });
  }
  renderSearchResults(){
    let filteredSongs = this.props.searchResults;

    let currentChannel = this.props.channels[0];
// console.log('searchresultsplaylist', currentChannel, "filteredSongs", filteredSongs);

    return filteredSongs.map((song) => {
      //--------------this should be passed to the component as well for "who added this" validation
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
// console.log('iteratingSong', song);
      return (
        <SongSearchResultsItem
          key={song._id}
          channel={currentChannel}
          song={song}
        />
      );
    });
  }

//   renderResults(){
// // console.log('searchResults Props', this.props);
//     let filteredSongs = this.props.searchResults;
//
// // console.log('this is running', filteredSongs);
//
//     //map individual song entries to create multiple lines
//     return filteredSongs.map((song) => {
//       const currentUserId = this.props.currentUser && this.props.currentUser._id;
//
//       return (
//         <p>{song.trackName} by {song.artistName}</p>
//       );
//     });
//     //this should be a component call that renders results and attaches a click action to add song to current channelID
//   }

  render() {

          // {console.log('channel props',this.props)}
    return (
      <div className="componentWrapper">
      <h3>Channel Rendering</h3>

      {this.renderChannelSongs()}

      <SearchSong />

      <ul>
        {this.renderSearchResults()}
      </ul>

      </div>

    );
  }

};

Channel.propTypes = {
  channels: PropTypes.array.isRequired,
  channelSong: PropTypes.array.isRequired,
  searchResults: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
