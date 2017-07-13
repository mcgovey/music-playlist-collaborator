import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';

// import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// import ChannelItem from '../components/ChannelItem.jsx';

// Channels component - represents the rendering of channels
export default class LandingPage extends Component {
	componentWillReceiveProps(nextProps) {
	// user just logged in/out
	console.log('curr', this.props.currentUser, 'prev', nextProps.currentUser)
		if (!this.props.currentUser  &&  nextProps.currentUser) {
			// this.setState({ showPublic: false });
			let redirect = Session.get('redirectAfterLogin');
			if(redirect) {
				console.log('redirect url', redirect);
				FlowRouter.go(redirect);
			}
		}
	}
	render() {

// console.log('user', Meteor.user());
		  // {console.log('channel props',this.props)}
	return (
	  <div className="componentWrapper">
	  <h3 className="text-center">Welcome to JustMashPlay</h3>

		<p>
			JustMashPlay wants to make managing your Spotify playlists a bit easier.  We allow you to copy public playlists and make changes based on your preferences.  As this application growth increases, you will begin to see recommendations for tracks to add or remove based on other user's preferences.  We look forward to having you join us on this exciting change to how music is managed online. 
		</p>
		<p>
		This web app is in early beta but I would love additional testers.  Please use the link below to register for access to the site and I will reach out shortly.	
		</p>


	  </div>

	);
  }

};

LandingPage.propTypes = {
  currentUser: PropTypes.object,
};
