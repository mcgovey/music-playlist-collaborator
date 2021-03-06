import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';

// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import ChannelItem from '../components/ChannelItem.jsx';

// Channels component - represents the rendering of channels
export default class ChannelList extends Component {

  renderChannels() {
// console.log('OverviewProps',this.props);

    let filteredChannels = this.props.channels;
    // if (this.state.hideCompleted) {
    //   filteredChannels = filteredChannels.filter(channel => !channel.checked);
    // }
    return filteredChannels.map((channel) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = channel.owner === currentUserId;

      return (
        <ChannelItem
          key={channel._id}
          channel={channel}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {

          // {console.log('channel props',this.props)}
    return (
      <div className="componentWrapper">
      <h3>My Playlists</h3>

      <table className="table table-hover table-bordered">
      
        <thead>
          <tr>
            <td>Playlist Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.renderChannels()}
        </tbody>
      </table>
        { this.props.currentUser ?
          <div className="container">
			<div className="col-sm-4 col-xs-12">
				<a className="btn btn-primary btn-block" href={FlowHelpers.pathFor( 'copyplaylist' )}>Copy a Spotify Playlist</a>
			</div>
			<div className="col-sm-4 col-xs-12">
			 	<a className="btn btn-primary btn-block" href={FlowHelpers.pathFor( 'newchannel' )}>Create a New Channel</a>
			</div>
          </div>
          : ''
        }


      </div>

    );
  }

};

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
