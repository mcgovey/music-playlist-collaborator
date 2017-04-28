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
					<label htmlFor="textInput" className="col-lg-2">Name your playlist</label>
					<div className="col-lg-10">
					<input
						type="text"
						ref="textInput"
						className="form-control"
						id="textInput"
						placeholder="Name your playlist to create"
					/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-lg-4 col-lg-offset-2 col-xs-12 col-xs-offset-0">
						<button type="submit" className="btn btn-primary btn-block">Submit</button>
					</div>
					<div className="col-lg-4 col-lg-offset-2 col-xs-12 col-xs-offset-0">
						<a className="btn btn-warning btn-block" href={FlowHelpers.pathFor( 'copyplaylist' )}>Copy a playlist</a>
					</div>
				</div>
			</form>
		</div>
    )
  }
}
