const clientId = 'db3a8874dd2d4eda92758c0e163dc98d';
//const clientSecret = '2eb212bba09640fa9e08432ca4ad9b4a';
const redirectURI = 'http://localhost:3000';
let accessToken = null;

const Spotify = {
  expirationTime: '',
  getAccessTokenFromURL() {
    console.log("getAccessTokenFromURL");
    const parsedURLForAccessToken = window.location.href.match("/.*access_token=([a-zA-Z0-9_-]*).*$");
    const parsedURLForExpiryTime = window.location.href.match("/.*expires_in=([0-9]+).*$");
    if (parsedURLForAccessToken !== null && parsedURLForExpiryTime !== null) {
      accessToken = parsedURLForAccessToken[1];
      const expiresIn = parsedURLForExpiryTime[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');

      return true;
    } else {
      return false;
    }
  },
  getAccessToken() {
    const authScope = 'playlist-modify-public playlist-modify-private'
    if (accessToken !== null || this.getAccessTokenFromURL()) {
      console.log("Found it!");
      return accessToken;
    } else {
      console.log("Needs access token");
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURI(authScope)}&redirect_uri=${redirectURI}`);
    }
  },
  async search(term) {
    if (this.getAccessToken() === '') {
        return;
    }
    try {
      console.log(this.accessToken);
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } throw new Error('Request Failed!');
    } catch(error) {
      console.log(error.message);
    }
  },
  async savePlaylist(playlistName, tracksURIArray) {
    if (playlistName === null && tracksURIArray.length === 0) {
      return;
    }
    let userId = '';
    let response = '';
    let jsonResponse = '';
    let playlistId = '';

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    if (this.getAccessToken() === '') {
        return;
    }

    try {
      response = await fetch(`https://api.spotify.com/v1/me`, { headers });

      if (response.ok) {
        jsonResponse = await response.json();
        userId = jsonResponse.id;
      } else {
        throw new Error('Failed to get current user Id!');
      }

      response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          name: playlistName,
          public: false
        })
      });

      if (response.ok) {
        jsonResponse = await response.json();
        playlistId = jsonResponse.id;
      } else {
        throw new Error(`Failed to create playlist ${playlistName}!`);
      }

      response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          uris: tracksURIArray
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add tracks to playlist ${playlistId}`);
      }
    } catch(error) {
      console.log(error.message);
      return 0;
    }
    return 1;
  }
};

export default Spotify;
