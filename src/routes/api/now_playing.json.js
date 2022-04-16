const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
const redirect_uri = "http://localhost:3000/"
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export async function get() {
  const {access_token, expires_in} = await fetch('http://localhost:3000/api/access_token.json', {
    method: 'POST',
  }).then(res => res.json())
  
  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
    Authorization: `Bearer ${access_token}`
    }
  })
  
  if (res.status === 204) { // Spotify returns 204 when there's nothing playing
    return {
      status: res.status,
      body: { isPlaying: false }}
  } else if(!res.ok) {
    return {
      body: res.status
    }
  }

  const song = await res.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return {
    body: {title, artist, album, isPlaying, albumImageUrl, songUrl},
  }
}

