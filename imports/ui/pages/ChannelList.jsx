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
          <div className="container btn-group">
            <a className="btn btn-primary" href={FlowHelpers.pathFor( 'newchannel' )}>Create a new channel</a>
            <a className="btn btn-primary" href={FlowHelpers.pathFor( 'copyplaylist' )}>Copy a playlist</a>
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
