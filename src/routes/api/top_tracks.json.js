
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

export async function get() {
    const {token} = await fetch('https://www.koenraijer.io/api/access_token.json').then(res => res.json())

    const res = await fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
  
    const data = await res.json();
    const top_tracks = data
  return {
    status: 200,
    body: {top_tracks: top_tracks.items},
  }
}