import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// Nav component - represents a fully styled nav bar
export default class Nav extends Component {

              // <li className={FlowHelpers.currentRoute('home')}><a href="#">Home <span className="sr-only">(current)</span></a></li>
            //   <li className="dropdown">
            //     <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
            //     <ul className="dropdown-menu" role="menu">
            //       <li><a href="#">Action</a></li>
            //       <li><a href="#">Another action</a></li>
            //       <li><a href="#">Something else here</a></li>
            //       <li className="divider"></li>
            //       <li><a href="#">Separated link</a></li>
            //       <li className="divider"></li>
            //       <li><a href="#">One more separated link</a></li>
            //     </ul>
            //   </li>
            //   <form className="navbar-form navbar-left" role="search">
            //   <div className="form-group">
            //     <input type="text" className="form-control" placeholder="Search" />
            //   </div>
            //   <button type="submit" className="btn btn-default">Submit</button>
            // </form>
  render() {

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="../">Just Mash Play</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
              <li className={FlowHelpers.currentRoute('home')}><a href={FlowHelpers.pathFor( 'home' )}>See my playlists</a></li>
              <li className={FlowHelpers.currentRoute('copyplaylist')}><a href={FlowHelpers.pathFor( 'copyplaylist' )}>Copy a playlist</a></li>
              <li className={FlowHelpers.currentRoute('newchannel')}><a href={FlowHelpers.pathFor( 'newchannel' )}>Create a new playlist</a></li>
              <li className={FlowHelpers.currentRoute('admin')}><a href={FlowHelpers.pathFor( 'admin' )}>Admin</a></li>

            </ul>
            <ul className="navbar-nav pull-right">
            	<li><AccountsUIWrapper /></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
