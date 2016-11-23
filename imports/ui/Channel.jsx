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

import '../../client/lib/vendor/html.sortable.min.js';

// Channels component - represents the rendering of channels
export default class Channel extends Component {

  initSortable(sortableClass) {
    let sortableList = $( sortableClass );
  console.log('sortable fired', sortableList);
    // sortableList.sortable( 'destroy' );
    // sortableList.sortable();
    // sortableList.sortable().off( 'sortupdate' );
    // sortableList.sortable().on( 'sortupdate', () => {
    //   updateIndexes( '.sortable' );
    // });
  }
  renderChannelSongs(){
console.log('loadingFlag',this.props.loading);

    if (!this.props.loading) {
console.log('render when loaded', this.props.loading);
      this.initSortable('.sortable');
      let channelSongList = this.channelSongList( this );
      return channelSongList;
    }


  }
  channelSongList( context ){
    let filteredChannelSongs = context.props.channelSong;

    let currentChannel = context.props.channels[0];
// console.log('searchresultsplaylist', currentChannel, "filteredSongs", filteredSongs);

    return filteredChannelSongs.map((channelSong) => {
      //--------------this should be passed to the component as well for "who added this" validation
      const currentUserId = context.props.currentUser && context.props.currentUser._id;
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

// console.log('countOfChannelSongs',this.props.countOfChannelSongs);

    return filteredSongs.map((song) => {
//--------------this should be passed to the component as well for "who added this" validation
// const currentUserId = this.props.currentUser && this.props.currentUser._id;
// console.log('iteratingSong', song);

      // Get the count of songs in list and add one for input
      song.order = this.props.countOfChannelSongs + 1;
      return (
        <SongSearchResultsItem
          key={song._id}
          channel={currentChannel}
          song={song}
        />
      );
    });
  }

  render() {
    return (
      <div className="componentWrapper">
      <h3>Channel Rendering</h3>

      <ul className="list-group sortable">
        {this.renderChannelSongs()}
      </ul>

      <SearchSong />

      <div className="list-group">
        {this.renderSearchResults()}
      </div>

      </div>

    );
  }

};

Channel.propTypes = {
  loading: PropTypes.bool,
  channels: PropTypes.array.isRequired,
  channelSong: PropTypes.array.isRequired,
  searchResults: PropTypes.array.isRequired,
  countOfChannelSongs: PropTypes.number,
  currentUser: PropTypes.object,
};
