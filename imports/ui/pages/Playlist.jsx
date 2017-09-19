import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Songs } from '../../api/Songs/methods.js';

import SongSearchResultsItem  from '../components/SongSearchResultsItem.jsx';
import SearchSong             from '../components/SearchSong.jsx';

// Channels component - represents the rendering of channels
export default class Playlist extends Component {

	constructor(props) {
		super(props);

		this.state = {
			// hideCompleted: false,
		};
	}
	getMoreSearchResults(){
		return (
			<div>
				<div className="col-sm-4 col-xs-12">
					<a className="btn btn-primary btn-block" href="">Search More</a>
				</div>
			</div>
			
		);
	}
	convertTimeFromMS( time ){
		const minutes = Math.floor(time / 60000);
		const seconds = ((time % 60000) / 1000).toFixed(0);
		return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);;
	}
	//method to remove a track from a playlist
	deleteChannelSong() {
		Meteor.call('channelSongs.remove', this._id);
	}
  changeChannelSongOrder() {
console.log('fired!', this);
  }
  renderChannelSongs(){

	//create duration property on channel song
	if(this.props.channelSong.length>0){
console.log('channel load',this.props.channelSong);

		// this.state.
		let cumulativeSongDuration = [];
		
		const temp1 = this.props.channelSong.map(function (a) { 
			return a.duration; 
		})
		const temp2 = temp1.reduce(function(a,b,i) {
console.log('a', a, 'b', b, 'i', i, 'cumulative', cumulativeSongDuration);
			cumulativeSongDuration[i] = a + b;
			return a+b; 
		},0);

		this.state.cumulativeSongDuration = cumulativeSongDuration;
	
console.log('duration array', this.state, 'temp', temp1, 'temp2',temp2)
	}
	

    if (!this.props.loading) {
// console.log('render when loaded', this.props.loading);
      // this.initSortable('.sortable');
      let channelSongList = this.channelSongList( this );
      return channelSongList;
    }


  }
  channelSongList( context ){
    //store only the relevant channel songs
    let filteredChannelSongs = context.props.channelSong;
    //get information on the current channel
    let currentChannel = context.props.channels[0];

    return filteredChannelSongs.map((channelSong, i) => {
//--------------this should be passed to the component as well for "who added this" validation
      // const currentUserId = context.props.currentUser && context.props.currentUser._id;
		const timeStr = this.convertTimeFromMS(channelSong.duration);
		return (
			<tr
				key={channelSong._id}
				data-id={channelSong._id}
			>
				<td onMouseOver={this.changeChannelSongOrder.bind(channelSong)}>{channelSong.order}</td>
				<td>{channelSong.trackName}</td>
				<td>{channelSong.artistName}</td>
				<td>{timeStr}</td>
				<td>
					<button className="btn btn-xs btn-danger" onClick={this.deleteChannelSong.bind(channelSong)}>
					&times;
					</button>
				</td>
			</tr>
		);
    });
  }
  renderSearchResults(){
    let filteredSongs = this.props.searchResults;

    let currentChannel = this.props.channels[0];

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
    //get the name of the channel
    let currentChannel = this.props.channels[0] || {channelName: ''};
    let channelName = currentChannel.channelName;
    return (
      <div className="componentWrapper">
      <h3>{channelName}</h3>

      <table className="table table-hover table-bordered">
      
        <thead>
          <tr>
            <td>Order</td>
            <td>Track Name</td>
            <td>Artist</td>
            <td>Track Length</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.renderChannelSongs()}
        </tbody>
      </table>

		<div className="col-sm-4 col-xs-12">
			<a className="btn btn-primary btn-block" href="">Share</a>
		</div>
		<div className="col-sm-4 col-xs-12">
			<a className="btn btn-primary btn-block" href="">Save to Spotify</a>
		</div>

      <SearchSong />

      <div className="list-group">
        {this.renderSearchResults()}
      </div>
		{this.getMoreSearchResults()}

      </div>

    );
  }
};

Playlist.propTypes = {
  loading: PropTypes.bool,
  channels: PropTypes.array.isRequired,
  channelSong: PropTypes.array.isRequired,
  searchResults: PropTypes.array.isRequired,
  countOfChannelSongs: PropTypes.number,
  currentUser: PropTypes.object,
};
