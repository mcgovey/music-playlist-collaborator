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
	  	<h3 className="text-center">Welcome to Just Mash Play</h3>
		
		<img className="fixed-ratio-resize" src="images/StockSnap_6QLR7RL7G5.jpg" alt=""/>
		<h5 className="text-center">What is Just Mash Play?</h5>
		<p>
		I miss the way we used to share music.  Some of my fondest memories are tied to the discovery of new music based on the recommendations of my friends.  Mixtapes and mixed CDs of artists gave us a way to craft songs together to create a completely new experience.
		</p>
		<h6 className="text-center">Then the internet came along and ruined everything</h6>
		<p>
			Not really.  The internet has been an incredible vehicle for having any kind of music at your fingertips in an instant.  However, that access has led to less sharing and more music discovery from what an algorithm thinks you might like.  Music discovery doesn't need to be completely computer-driven, Just Mash Play will let you make sharing music easy again.
		</p>

		<button>Login then start a new playlist</button>
		<h5 className="text-center">How much does it cost?</h5>
		<p>
			Limit time on playlists
		</p>
		<h5 className="text-center">How do we keep the playlists manageable?</h5>
		<p>
			Limit time on playlists
		</p>
<p>
		For the most part playlists have replaced that but much of what is available to listen to today is either generated by an algorithm or some curator that you don't know.  Just Mash Play intends to make sharing music personal again.

Couple of components that facilitate sharing
-reasonable playlist length
-accessibility
</p>
		
		<p>
		Just Mash Play wants to make managing your Spotify playlists a bit easier.  We allow you to copy public playlists and make changes based on your preferences.  As this application growth increases, you will begin to see recommendations for tracks to add or remove based on other user's preferences. 
		</p>
		<h5 className="text-center">Why bother with this?</h5>
		<p>
		How many times have you thought that a playlist would be great if it had that one extra song, or if you could just get rid of that one track you don't think goes with the rest.  Just Mash Play makes it easier to copy playlists and customize them to your preferences.
		</p>

		<h5 className="text-center">About Just Mash Play</h5>
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
