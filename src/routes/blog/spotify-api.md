---
title: Using the Spotify API with SvelteKit 
subtitle: Create a component that shows what you're listening to in realtime from scratch.
date: "2022-04-20"
updated: "2022-04-20"
tags: 
    - Computer Science
    - Web development
    - SvelteKit
category: tutorial
layout: post
image: '/blog/ogimage_spotify_api.png'
show_image: false
---
<script>
    import Image from '$lib/components/Image.svelte'
    import Blockquote from '$lib/components/markdown/Blockquote.svelte'
    import NowPlaying from '$lib/components/NowPlaying.svelte'
</script>

Ever since I saw <a href="https://leerob.io/">this implementation of the Spotify API in Next.js</a> (check the footer), I've been wanting to do the same thing in SvelteKit. Knowing the song someone's listening to in that very moment makes an otherwise mostly static website feel pretty dynamic.

So, I resumed my quest into the world of API's, requests and endpoints from where I left off: <a href="https://www.koenraijer.io/blog/svelteKit-endpoints">Fetching from a public API with SvelteKit Endpoints</a>.

I learned a lot about HTTP methods, SvelteKit endpoints and I learned about [Postman](https://www.postman.com/) as an easy way to test API requests. Scattered throughout this post are many links to resources that helped me figure things out. They might be of interest to you as a refresher or as a starting point for further learning.

## 0.1 What are we going to do? 
We are going to use the <a href="https://developer.spotify.com/documentation/general/guides/authorization/code-flow/">Authorization Code Flow</a> to get access to the Spotify Web API. We'll use our access to get data about the track we're listening to in that moment, as well as our 20 top tracks of the past half year. We'll do that using SvelteKit endpoints, which will be run server-side as [serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions). The data will be accessible to our frontend using those endpoints. We'll fetch it and display it nicely in a Svelte component.

This is what that's going to look like: 

<NowPlaying/>

## 0.2 Creating a Spotify app
Follow [this tutorial](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/) to create your own Spotify app. 
- `edit settings` and add `http://localhost:3000` to  Redirect URIs. Make sure to click **Add, and then save** at the bottom of the pop-up. 

Notice the *Client ID* and the *Client Secret* (for which you first have to press *Show Client Secret*), on the app overview page.

## 0.3 Storing variables in .env
Create `src > .env`. Add your client ID and client secret. Make sure you prefix the name with `VITE_` ([otherwise you can't import them locally](https://vitejs.dev/guide/env-and-mode.html#env-files)). We will later pass these to Vercel as environment variables to Vercel, meaning they won't be exposed to the client. 

```js
// .env
VITE_SPOTIFY_CLIENT_ID=<clientid>
VITE_SPOTIFY_CLIENT_SECRET=<clientsecret>
```

We will come back to this later. First, let's take a look at the Authorization Code Flow. 

## 0.4 Authorization Code Flow
<Image src="/blog/AuthG_AuthoriztionCode.png" alt="Spotify Web API's Authorization Code Flow visualized" halfbleed />

This image provides a pretty clear overview of the steps needed to get data from the Spotify Web API. 
It shows that we need to: 
- Authorize in order to get a code
- Use that code to get a refresh token
- Use that refresh token to get an access token
- Use the access token to get our data 

## 1.0 Requesting user authorization
We should send a GET request to `https://accounts.spotify.com/authorize` with the following parameters:
- `client_id` (we know this already)
- `response_type`: must set this to `code`.
- `redirect_uri`: `http://localhost:3000` (same as app settings)
- `scope`: determines what you'll be able to be authorized to request. For the tutorial, we'll use `user-read-currently-playing` and `user-top-read`. Scopes should be separated by spaces. [Check out other authorization scopes](https://developer.spotify.com/documentation/general/guides/authorization/scopes/). 

Since we only need to do this once to login and get our `code`, we'll just construct the request by hand and paste it in our browser. Fill in your client ID in the following url and paste in your browser (all other parameters have already been filled in).

```
// Browser
https://accounts.spotify.com/authorize?client_id=<clientid>&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20user-top-read
```

This should redirect you to something like this:
```
http://localhost:3000/?code=<code>
```

Save the code for now. We'll use it to get a Refresh Token. 

## 2.0 Getting a Refresh Token
Next, we'll use the command-line tool [cURL](https://en.wikipedia.org/wiki/CURL) to send a POST request to the Spotify API Token endpoint. We pass it our request headers using `-H`, and our request body parameters using `-d` (Check out [this list of `curl` options](https://gist.github.com/eneko/dc2d8edd9a4b25c5b0725dd123f98b10) if you're interesed).

```bash
// Terminal
curl -H "Authorization: Basic <base64 encoded client_id:client_secret>"
-d grant_type=authorization_code -d code=<code> -d redirect_uri=http%3A
%2F%2Flocalhost:3000 https://accounts.spotify.com/api/token
```

You'll need to add the following:
- The code we got earlier.
- A [Base64](https://en.wikipedia.org/wiki/Base64) encoded string with your client ID and secret in the format `clientid:clientsecret`. You can create one [here](https://www.base64encode.org/). 

Paste the resulting command in your terminal / cmd prompt and press enter. 
What you'll get back should hold your Refresh Token in JSON format. 

We'll add the Refresh Token to our `.env` file as `VITE_SPOTIFY_REFRESH_TOKEN`. The `.env` file should now look like this:

```js
// .env
VITE_SPOTIFY_CLIENT_ID=<clientid>
VITE_SPOTIFY_CLIENT_SECRET=<clientsecret>
VITE_SPOTIFY_REFRESH_TOKEN=<refreshtoken>
```

## 3.0 Getting an Access Token
Our Refresh Token is valid indefinitely, but we can't use it to request data from the Spotify API. For that, we'll need an Access Token. Each Access Token is only valid for 1 hour, so we'll need to request them programmatically. 

So, create `src > routes > api > access_token.json.js`. This will be an [endpoint](https://kit.svelte.dev/docs/routing#endpoints) that exports a [request handler function](https://kit.svelte.dev/docs/types#sveltejs-kit-requesthandler) which sends a POST request to the correct Spotify endpoint and returns our Access Token. 

**Note:** this endpoint *sends* a POST request, but the result can be accessed through a GET endpoint. This confused me at first. 

```js
// access_token.json.js
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const redirect_uri = "http://localhost:3000/"
const token_endpoint = `https://accounts.spotify.com/api/token`;

export const get = async () => {
	const { access_token } = await fetch(token_endpoint, {
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token,
			redirect_uri,
			client_id,
			client_secret,
		})
	}).then(res => res.json());

	return {
		body: access_token
	}
};
```

This code does the following:
1. Declares or imports variables we need from `.env` per [Vite documentation](https://vitejs.dev/guide/env-and-mode.html#env-files).
2. Export an async function called `post`, which runs everytime the URL of the endpoint is called with the POST method. We'll do exactly that later, when we need an Access Token. 
3. Use the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (which is vanilla JS) to send a POST request to our `token_endpoint`, with the required `headers` and request body parameters (under `body`). You can find what they are exactly under "Request Access Token" at [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/). 
	- **Note**: we already have our Refresh Token, so we use `grant_type: 'refresh_token'` instead of `grant_type: 'authorization_code'`.
- Use `.then()` method ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)) to convert the response to json. 
- Store the result as a constant using `const { access_token }`. This syntax uses [object destructuring](https://www.freecodecamp.org/news/how-to-destructure-objects-javascript/).

## 4.0 Use our access token to send requests to the Spotify Web API

The data on the now playing song and top tracks are probably better off in separate endpoints. We don't need the top tracks every time we update our now playing song, and vice versa. 

So, we'll be creating two endpoints: `now_playing.json.js`, `top_tracks.json.js`.  

### 4.1 now_playing endpoint
Create `src > routes > api > now_playing.json.js`, which will send a GET request and return data on the track we're currently playing. 

```js

const now_playing_endpoint = `https://api.spotify.com/v1/me/player/currently-playing`;

export async function get() {
    const {access_token} = await fetch('http://localhost:3000/api/access_token.json').then(res => res.json())

	const res = await fetch(now_playing_endpoint, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	})

	if (res.status === 204 || res.status > 400) {
		return {body: { isPlaying: false }}
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
```

1. Fetches an access_token from `access_token.json`.
2. Sends a GET request to the `now_playing_endpoint` with our access_token as authorization. 
3. Checks if the response has a status of 204 or >400. This is what the API will return if you're not using Spotify. We don't want the error message though, because we want it to say that you're not currently listening. So we intercept the error message and return `{isPlaying: false}` instead. 
4. We then go into the response object and create several constants.
	- **Note:** for the artist, we go over the array of artists (as there can be multiple), and join them together in a comma-separated string. 
5. Return all the variables we created.

You should now be able to see your newly created endpoint at `http://localhost:3000/api/now_playing.json`. 

### 4.2 top_tracks endpoint
Create `src > routes > api > top_tracks.json.js`. The code is very similar to the now_playing endpoint. 

```js
  
const top_tracks_endpoint = `https://api.spotify.com/v1/me/top/tracks`;

export async function get() {
    const {access_token} = await fetch('http://localhost:3000/api/access_token.json').then(res => res.json())

	const data = await fetch(top_tracks_endpoint, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	}).then(res => res.json());

	return {
		status: 200,
		body: {top_tracks: data.items},
	}
}
```

See it live at `http://localhost:3000/api/top_tracks.json`!
### 4.3 An aside about dealing with API responses
In the above code, you can see I return `top_tracks` as `data.items`. I know I need `data.items` because I looked at what I got back from the request, using the following code: 

```html
<pre>{JSON.stringify(data, null, 2)}</pre>
```

Check out [JSON.stringify() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) for more information. 

## 5.0 Creating our NowPlaying component 

Create `src > lib > components > NowPlaying.svelte`. This will be a component that calls the `now_playing.json` endpoint and displays the song we're currently playing. It uses Tailwind CSS for styling. 

```html
<script>
	import {onMount} from 'svelte';
	let song = {}

	async function getNowPlaying() {
		song = await fetch('/api/now_playing.json').then(res => res.json())
	}

	onMount(async () => {
		getNowPlaying();
	})

	setInterval(() => {getNowPlaying()}, 5000);
</script>

<div class="text-sm w-fit text-gray-500 bg-gray-100 border-2 p-4 pl-5 py-2 rounded-lg">

	{#if song.isPlaying}
		<div class="audio relative m-0 p-0 mr-1 top-0 inline bg-gray-500">
			<span></span>
			<span></span>
			<span></span>
		</div>
		
		<span class="leading-0"><span class="font-semibold ml-4"><a href={song.songUrl} rel="noopener noreferrer" target="_blank" class="hover:underline">{song.title}</a></span> - {song.artist}</span>
	
	{:else}
		<svg class="inline h-4 w-4 top-0 -translate-y-[1.5px]" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0c-8.803 0-16 7.197-16 16s7.197 16 16 16c8.803 0 16-7.197 16-16s-7.12-16-16-16zM23.36 23.12c-0.319 0.479-0.881 0.64-1.36 0.317-3.76-2.317-8.479-2.797-14.083-1.52-0.557 0.165-1.037-0.235-1.199-0.72-0.156-0.557 0.24-1.036 0.719-1.197 6.084-1.36 11.365-0.803 15.521 1.76 0.563 0.24 0.64 0.88 0.401 1.36zM25.281 18.719c-0.401 0.563-1.12 0.803-1.683 0.401-4.317-2.641-10.88-3.437-15.916-1.839-0.641 0.156-1.365-0.161-1.521-0.803-0.161-0.64 0.156-1.359 0.797-1.52 5.844-1.761 13.041-0.876 18 2.161 0.484 0.24 0.724 1.041 0.323 1.599zM25.443 14.24c-5.125-3.043-13.683-3.36-18.563-1.839-0.801 0.239-1.599-0.24-1.839-0.964-0.239-0.797 0.24-1.599 0.959-1.839 5.683-1.681 15.041-1.359 20.964 2.161 0.719 0.401 0.957 1.36 0.557 2.079-0.401 0.563-1.36 0.801-2.079 0.401z"/></svg>
		<strong>Not playing</strong> - <span class="text-gray-500">Spotify</span>
	{/if}
	
	<br>
	
	<a href="/dashboard" sveltekit:prefetch class="text-xs text-primary hover:underline flex justify-end text-right"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline-block bottom-0 translate-y-[0.45rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
	<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
	</svg>Top tracks</a>

</div>

<style>

.audio span {
	width: 4px;
	height: 100%;
	border-radius: 2px;
	position: absolute;
	bottom: .25rem;
	@apply bg-gray-500;
}

.audio span:first-of-type {

margin-top: 0;

}

.audio span:nth-child(1) {

animation: animationTest 1.5s infinite ease-in-out;

left: 0;

}

.audio span:nth-child(2) {

animation: animationTest 1.75s infinite ease-in-out;

left: 5px;

}

.audio span:nth-child(3) {

animation: animationTest 2s infinite ease-in-out;

left: 10px;

}

@keyframes animationTest {

0% { height: 2px; }

50% { height: 14px; }

100% { height: 2px; }

}

</style>
```

I posted this mostly, so you can be inspired to create your own custom component. You have the data, so make something cool with it! 
- It uses `setInterval` to make new requests every 5 seconds. I considered using song length and song progress (both of which are available), but that seemed overly complicated and error-prone. 
- It uses Svelte `{#if}` syntax to display the currently playing song, or "Not playing - Spotify" based on whether I am playing a song or not. 
- The currently playing song has a CSS animation mimicing sound waves that I ~~stole~~ adapted  from [this codepen](https://codepen.io/BramKrekels/pen/WoeQdy). That accounts for all the contents of the `<style` tag. 

## 6.0 Creating the Dashboard

Create `src > routes > dashboard.svelte`. This page will fetch our top tracks from our `top_tracks.json` endpoint. 

```html
<script context="module">
	export const load = async ({fetch}) => {
		const top_tracks = await fetch('./api/top_tracks.json').then(res => res.json())
	
		return {
			props: top_tracks
		}
	}
</script>

<script>
	export let top_tracks;
</script>

<h1 class="text-3xl mb-2 text-base">Top tracks</h1>
<p class="mb-8">Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.</p>
<div>
	{#each top_tracks.top_tracks as track, index}
		<div class="grid grid-cols-4 content-start">
			<div class="col-span-3">	
				<a class="font-semibold text-lg" href={track.external_urls.spotify} rel="noopener noreferrer" target="_blank">{index + 1}. {track.name}</a>
				<span>{track.artists[0].name}</span>
			</div>
			<img class="mb-4 mt-2 h-20 w-20" alt="{track.name}'s album cover" height={track.album.images[1].height} width={track.album.images[1].width} src={track.album.images[1].url}>
		</div>
		<hr class="mt-2 mb-8">
	{/each}
</div>
```

## 7.0 Room for improvement

I am sure there are several ways this code can be improved. These are some of the things I already thought of: 
- [Shadow endpoints](https://github.com/sveltejs/kit/issues/3532) could be used if you don't plan on adding more stuff to the dashboard. They make `load` boilerplate unnecessary in many cases, but they haven't been added to the documentation so far. 
- I'm probably lacking in the error handling department. It's something I plan on learning more about.
- The number of API requests can be reduced by using the `expires_in` variable in when requesting a new Access Token. It's better to check whether the old Access Token works, and if not, request a new one. 
- Perhaps there's a more elegant solution to getting the now playing song, instead of an API request every 5 seconds?
- Using Svelte's `{#await}` syntax display "Loading..." instead of Not playing. 

If you have suggestions to improve my code, found errors or have other comments please don't hesitate to tell me 😉.