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
	  <h1>Welcome to JustMashPlay</h1>




	  </div>

	);
  }

};

LandingPage.propTypes = {
  currentUser: PropTypes.object,
};
