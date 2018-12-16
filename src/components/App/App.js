import React, {Component} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    console.log("Adding track to playlist: \n" + track.id);
    const tracks = this.state.playlistTracks;
    const existingTrack = tracks.find(playlistTrack => playlistTrack.id === track.id);
    if (!existingTrack) {
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      });
    }
  }

  removeTrack(track) {
    console.log("Removing track from playlist: \n" + track.id)
    // YOU NEED TO FIX THIS!!!
    const _playlistTracks = this.state.playlistTracks;
    const newPlaylistTracks = _playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    console.log(newPlaylistTracks);
    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  updatePlaylistName(name) {
    console.log("Renaming playlist from " + this.state.playlistName + " to " + name);
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.map(playlistTrack => {
      return trackURIs.push(playlistTrack.uri)
    });
    console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        searchResults: []
      });
    });
  }

  search(term) {
    if (term === undefined) {
      console.log(`Please enter a search term`);
      return;
    }
    console.log(`Searching for: ${term}`);

    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        {console.log("Rendering App")}
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              name={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
