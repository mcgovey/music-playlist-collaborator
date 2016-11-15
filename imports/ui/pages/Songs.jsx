import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import SearchSong from '../components/SearchSong.jsx';

// Channels component - represents the rendering of channels
export default class Songs extends Component {

  render() {

          // {console.log('channel props',this.props)}
    return (
      <div className="componentWrapper">
      <h3>Songs Rendering</h3>

      <SearchSong />



      </div>

    );
  }

};

// getSongs.propTypes = {
//   tasks: PropTypes.array.isRequired,
//   currentUser: PropTypes.object,
// };
