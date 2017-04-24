import React from 'react';
import {mount} from 'react-mounter';
// load AppMain, App, and Channel React components
// import AppMain from '../imports/ui/AppMain.jsx';
import App from '../imports/ui/layouts/App.jsx';

import ChannelList from '../imports/ui/pages/ChannelList.jsx';
import ChannelListContainer from '../imports/ui/containers/ChannelListContainer.js';

import NewChannel from '../imports/ui/NewChannel.jsx';

import CopyPlaylist from '../imports/ui/pages/CopyPlaylist.jsx';
import CopyPlaylistContainer from '../imports/ui/containers/CopyPlaylistContainer.js';

import Playlist from '../imports/ui/pages/Playlist.jsx';
import PlaylistContainer from '../imports/ui/containers/PlaylistContainer.js';

import Admin from '../imports/ui/pages/Admin.jsx';
import AdminContainer from '../imports/ui/containers/AdminContainer.js';


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