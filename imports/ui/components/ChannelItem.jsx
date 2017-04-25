import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Channel component - represents a single Channel item
export default class ChannelItem extends Component {

  deleteThisChannel() {
    Meteor.call('channels.remove', this.props.channel._id);
  }

  // togglePrivate() {
  //   Meteor.call('channels.setPrivate', this.props.channel._id, ! this.props.channel.private);
  // }

  render() {
    // Give channels a different className when they are checked off,
    // so that we can style them nicely in CSS
    const channelClassName = classnames({
      checked: this.props.channel.checked,
      private: this.props.channel.private,
    });
    const currChannel = this.props.channel;
// {this.props.channel.username}
    return (

      <tr
        key={currChannel._id}
        data-id={currChannel._id}
        
      >
      
        <td><a href={FlowHelpers.pathFor( 'channel', {_id: currChannel._id} )}>{currChannel.channelName}
      </a></td>
        <td>
          <button className="btn btn-xs btn-danger" onClick={this.deleteThisChannel.bind(this)}>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}

ChannelItem.propTypes = {
  // This component gets the channel to display through a React prop.
  // We can use propTypes to indicate it is required
  channel: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
