import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

// import {ExternalPlaylists} from '../../api/playlists/playlistMethods.js';

// Channels component - represents the rendering of channels
export default class NewUser extends Component {
  componentDidMount() {
//     Meteor.call('spotify.getCurrUserPlaylists', function(err, response) {
// // console.log('copyResponse: ', response, 'error:', err);
// console.log('new user page with props', currentUser);
//     });
  }

  handleSubmit(event) {
	event.preventDefault();
	
	//Check that all fields were filled out
	//-------Insert validation code here
	
	// Find the text field via the React ref
    const text = {
      'channelName' : ReactDOM.findDOMNode(this.refs.textInput).value.trim(),
      '_id'         : Random.id(),
    };
console.log('text', text);

    Meteor.call('userList.insert', function (error, result) {
      console.log('returned err', error, 'res', result);

      // FlowHelpers.pathFor( 'channel', result );
    //   FlowRouter.go('/channel/' + result);
    });

    // Clear form
    // ReactDOM.findDOMNode(this.refs.textInput).value = '';
    
  }
  render() {

console.log('channel props',this.props)
	// const currentUser = this.props.currentUser || '';

	const currentUser = this.props.currentUser ? this.props.currentUser.profile.id : '';

	console.log('currentUser var', currentUser);

    return (
      <div className="componentWrapper">

        <h3 className="text-center">Please fill in the profile details below before proceeding</h3>
		<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
			<div className="form-group">
				<label htmlFor="nameOfUser" className="col-lg-2">Your Name</label>
				<div className="col-lg-10">
				<input
					type="text"
					ref="nameOfUser"
					className="form-control"
					id="nameOfUser"
					placeholder="Your name"
				/>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="emailAddress" className="col-lg-2">Email Address</label>
				<div className="col-lg-10">
				<input
					type="email"
					ref="emailAddress"
					className="form-control"
					id="emailAddress"
					placeholder="Enter your email address"
				/>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="spotifyUser" className="col-lg-2">Spotify Username</label>
				<div className="col-lg-10">
				<input 
					type="text" 
					id="spotifyUser" 
					className="form-control" 
					placeholder={currentUser} 
				/>
				</div>
			</div>
			<div className="form-group">
				<div className="col-lg-4 col-lg-offset-2 col-xs-12 col-xs-offset-0">
					<button type="submit" className="btn btn-primary btn-block">Submit</button>
				</div>
			</div>
		</form>


      </div>

    );
  }

};

NewUser.propTypes = {
//   playlists: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
