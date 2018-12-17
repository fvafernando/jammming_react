import React, {Component} from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList'

class Playlist extends Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    if (event.type === 'blur' ||
      (event.type === 'keypress' && event.key === 'Enter')
    ) {
      this.props.onNameChange(event.target.value);
    }
  }

  render() {
    console.log("Rendering Playlist");
    return (
      <div className="Playlist">
        <input defaultValue={this.props.name} onBlur={this.handleNameChange} onKeyPress={this.handleNameChange}/>
        <TrackList
          name={this.props.name}
          tracks={this.props.tracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
        />
        <a href="#savePlaylist" className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
