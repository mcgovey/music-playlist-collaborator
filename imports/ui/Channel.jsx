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

//   initSortable(sortableClass) {
//     let sortableList = $( sortableClass );
// console.log('sortable fired', sortableList);
//     sortable( sortableList, 'destroy' );
//     sortable( sortableList );
//     // sortable( sortableList )[0].removeEventListener('sortupdate');
// console.log('sortable func', sortable( sortableList )[0] );
// //https://themeteorchef.com/snippets/adding-drag-and-drop-sorting-to-lists/
// //https://github.com/voidberg/html5sortable

//   sortable( sortableList )[0].addEventListener('sortupdate', function(e) {

// console.log('fire away', e.detail.item);
      

//       This event is triggered when the user stopped sorting and the DOM position has changed.

//       e.detail.item contains the current dragged element.
//       e.detail.index contains the new index of the dragged element (considering only list items)
//       e.detail.oldindex contains the old index of the dragged element (considering only list items)
//       e.detail.elementIndex contains the new index of the dragged element (considering all items within sortable)
//       e.detail.oldElementIndex contains the old index of the dragged element (considering all items within sortable)
//       e.detail.startparent contains the element that the dragged item comes from
//       e.detail.endparent contains the element that the dragged item was added to (new parent)

      
//   });
//   }
//   dragStart(e) {
//     this.dragged = e.currentTarget;
//     e.dataTransfer.effectAllowed = 'move';

//     // Firefox requires calling dataTransfer.setData
//     // for the drag to properly work
//     e.dataTransfer.setData("text/html", e.currentTarget);
//   }
//   dragEnd(e) {

//     this.dragged.style.display = "block";
//     // this.dragged.parentNode.removeChild(placeholder);

// console.log('this', this, 'event', e);
//     // Update state
//     // var data = this.props.channelSong;
//     // var from = Number(this.dragged.dataset.id);
//     // var to = Number(this.over.dataset.id);
//     // if(from < to) to--;
//     // data.splice(to, 0, data.splice(from, 1)[0]);
//     // this.setState({data: data});
//   }
//   dragOver(e) {
//     e.preventDefault();
//     this.dragged.style.display = "none";
//     // if(e.target.className == "placeholder") return;
//     this.over = e.target;
//     // e.target.parentNode.insertBefore(placeholder, e.target);
//   }
  deleteChannelSong() {
console.log('delete', this);
    Meteor.call('channelSongs.remove', this._id);
  }
  renderChannelSongs(){
console.log('channel load',this);

    if (!this.props.loading) {
// console.log('render when loaded', this.props.loading);
      // this.initSortable('.sortable');
      let channelSongList = this.channelSongList( this );
      return channelSongList;
    }


  }
  channelSongList( context ){
    let filteredChannelSongs = context.props.channelSong;

    let currentChannel = context.props.channels[0];
// console.log('searchresultsplaylist', currentChannel, "filteredSongs", filteredSongs);

    return filteredChannelSongs.map((channelSong, i) => {
      //--------------this should be passed to the component as well for "who added this" validation
      // const currentUserId = context.props.currentUser && context.props.currentUser._id;
// console.log('iteratingSong', song);
      return (
        <li
          key={channelSong._id}
          data-id={channelSong._id}
        >

        {channelSong.order}. {channelSong.trackName} by {channelSong.artistName}
        <button className="delete" onClick={this.deleteChannelSong.bind(channelSong)}>
          &times;
        </button>
        </li>
      );
    });
  }
  renderSearchResults(){
    let filteredSongs = this.props.searchResults;

    let currentChannel = this.props.channels[0];

console.log('countOfChannelSongs',this.props.countOfChannelSongs);

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
//   dragOver(e) {
// // console.log('dragOver', e);
//     e.preventDefault();
//     this.dragged.style.display = "none";
//     // if(e.target.className == "placeholder") return;
//     this.over = e.target;
//     // e.target.parentNode.insertBefore(placeholder, e.target);
//   }

  render() {
    return (
      <div className="componentWrapper">
      <h3>Channel Rendering</h3>
      <ul 
        className="list-group"
      >
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
  allChannelSongs: PropTypes.array,
};
