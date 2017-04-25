import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
// import { createContainer } from 'meteor/react-meteor-data';


export default class NewChannel extends Component {
  handleSubmit(event) {
    event.preventDefault();
// console.log('fired');

    // Find the text field via the React ref
    const text = {
      'channelName' : ReactDOM.findDOMNode(this.refs.textInput).value.trim(),
      '_id'         : Random.id(),
    };

console.log('text', text);

    Meteor.call('channels.insert', text, function (error, result) {
      console.log('returned err', error, 'res', result);

      // FlowHelpers.pathFor( 'channel', result );
      FlowRouter.go('/channel/' + result);
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    
  }

//--------To-do - separate the copy link into it's own function
  render() {
    return (
      <div>
        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >

          <div className="form-group">
            <label htmlFor="textInput">Name your playlist</label>
            <input
              type="text"
              ref="textInput"
              className="form-control"
              placeholder="Type to add new channels"
            />
          </div>          
        </form>
        <h3>{FlowHelpers.pathFor( 'newchannel' )}</h3>
        <h5><a href={FlowHelpers.pathFor( 'newchannel' )}>Copy from an existing playlist</a></h5>
      </div>
    )
  }
}
