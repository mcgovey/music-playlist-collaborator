import React from 'react';
import {mount} from 'react-mounter';
// load AppMain, App, and Channel React components
// import AppMain from '../imports/ui/AppMain.jsx';
import App from '../../ui/layouts/App.jsx';

import LandingPage from '../../ui/pages/LandingPage.jsx';
import LandingPageContainer from '../../ui/containers/LandingPageContainer.js';

import ChannelList from '../../ui/pages/ChannelList.jsx';
import ChannelListContainer from '../../ui/containers/ChannelListContainer.js';

import NewChannel from '../../ui/NewChannel.jsx';

import CopyPlaylist from '../../ui/pages/CopyPlaylist.jsx';
import CopyPlaylistContainer from '../../ui/containers/CopyPlaylistContainer.js';

import Playlist from '../../ui/pages/Playlist.jsx';
import PlaylistContainer from '../../ui/containers/PlaylistContainer.js';

import Admin from '../../ui/pages/Admin.jsx';
import AdminContainer from '../../ui/containers/AdminContainer.js';


FlowRouter.route('/landingPage', {
	name: 'landingPage',
	action() {
		mount(App, {content: <LandingPageContainer />});
	}
});

// FlowRouter.route('/newchannel', {
//   name: 'newchannel',
//   action() {
//     mount(App, {content: <NewChannel />});
//   }
// });

// FlowRouter.route('/forkplaylist', {
//   name: 'copyplaylist',
//   action() {
//     mount(App, {content: <CopyPlaylistContainer />});
//   }
// });

FlowRouter.route('/channel/:_id', {
  name:'channel',
  action( params ) {
    //empty search var
    Session.set('searchVal','');

    mount(App, {
      content: <PlaylistContainer {...params} />
    });
  }
});

// FlowRouter.route('/admin', {
//   name: 'admin',
//   action() {
//     mount(App, {content: <AdminContainer />});
//   }
// });
// var loggedIn = FlowRouter.group
//  triggersEnter: [ ->
//    unless Meteor.loggingIn() or Meteor.userId()
//      route = FlowRouter.current()
//      unless route.route.name is 'login'
//        Session.set 'redirectAfterLogin', route.path
//      FlowRouter.go ‘admin’
//  ]

var loggedIn = FlowRouter.group({
  prefix: '/',
  name: 'homeauth',
  triggersEnter: [function(context, redirect) {
  	if(!Meteor.userId()){
  		var route = FlowRouter.current();
  		if(route.route.name !== 'login'){
console.log('user route', route);
  			Session.set('redirectAfterLogin',route.route.name);
  		}
  		FlowRouter.go('landingPage');
  	}
console.log('running group triggers',Meteor.user(),'-',Meteor.loggingIn(),'-',Meteor.userId());
  }]
});
// handling /home route
loggedIn.route('/', {
  name:'home',
  action() {
		mount(App, {content: <ChannelListContainer />});
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /forkplaylist trigger');
  }]
});


var loggedInSub = FlowRouter.group({
  prefix: '/auth',
  name: 'auth',
  triggersEnter: [function(context, redirect) {
  	if(!Meteor.userId()){
  		var route = FlowRouter.current();
  		if(route.route.name !== 'login'){
console.log('user route', route);
  			Session.set('redirectAfterLogin',route.route.name);
  		}
  		FlowRouter.go('landingPage');
  	}
console.log('running group triggers',Meteor.user(),'-',Meteor.loggingIn(),'-',Meteor.userId());
  }]
});

// handling /newchannel route
loggedInSub.route('/newchannel', {
	name:'newchannel',
	action() {
		mount(App, {content: <NewChannel />});
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /newchannel trigger');
	}]
});

// handling /copyplaylist route
loggedInSub.route('/forkplaylist', {
	name:'copyplaylist',
	action() {
		mount(App, {content: <CopyPlaylistContainer />});
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /forkplaylist trigger');
	}]
});

// FlowRouter.route('/newchannel', {
//   name: 'newchannel',
//   action() {
//     mount(App, {content: <NewChannel />});
//   }
// });

// FlowRouter.route('/forkplaylist', {
//   name: 'copyplaylist',
//   action() {
//     mount(App, {content: <CopyPlaylistContainer />});
//   }
// });

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  triggersEnter: [function(context, redirect) {
  	if(!Meteor.userId()){
  		var route = FlowRouter.current();
  		if(route.route.name !== 'login'){
console.log('user route', route);
  			Session.set('redirectAfterLogin',route.route.name);
  		}
  		FlowRouter.go('landingPage');
  	}
  }]
});

// handling /admin route
adminRoutes.route('/', {
  name: 'admin',
  action() {
    mount(App, {content: <AdminContainer />});
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /admin trigger');
  }]
});