
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

export async function get() {
    const {access_token, expires_in} = await fetch('http://localhost:3000/api/access_token.json', {
        method: 'POST',
    }).then(res => res.json())
  
    const res = await fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
        Authorization: `Bearer ${access_token}`
        }
    });
  
    const data = await res.json();
    const top_tracks = data
  return {
    status: 200,
    body: {top_tracks: top_tracks.items},
  }
}