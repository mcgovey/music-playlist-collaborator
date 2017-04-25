import React from 'react';
import {mount} from 'react-mounter';
// load AppMain, App, and Channel React components
// import AppMain from '../imports/ui/AppMain.jsx';
import App from '../../ui/layouts/App.jsx';

import ChannelList from '../../ui/pages/ChannelList.jsx';
import ChannelListContainer from '../../ui/containers/ChannelListContainer.js';

import NewChannel from '../../ui/NewChannel.jsx';

import CopyPlaylist from '../../ui/pages/CopyPlaylist.jsx';
import CopyPlaylistContainer from '../../ui/containers/CopyPlaylistContainer.js';

import Playlist from '../../ui/pages/Playlist.jsx';
import PlaylistContainer from '../../ui/containers/PlaylistContainer.js';

import Admin from '../../ui/pages/Admin.jsx';
import AdminContainer from '../../ui/containers/AdminContainer.js';


FlowRouter.route('/', {
	name: 'home',
	action() {
		mount(App, {content: <ChannelListContainer />});
	}
});

FlowRouter.route('/newchannel', {
  name: 'newchannel',
  action() {
    mount(App, {content: <NewChannel />});
  }
});

FlowRouter.route('/forkplaylist', {
  name: 'copyplaylist',
  action() {
    mount(App, {content: <CopyPlaylistContainer />});
  }
});

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



FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    mount(App, {content: <AdminContainer />});
  }
});