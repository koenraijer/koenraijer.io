---
title: Fetching from a public API with SvelteKit Endpoints
subtitle: Using a SvelteKit endpoint to fetch data from an external API
date: "2022-03-07"
updated: "2022-03-07"
tags:
    - Web development
category: tutorial
layout: post
---

<script context="module">
    export const load = async ({ fetch }) => {
      const activity = await fetch('../api/activity.json').then((response => response.json()))

      return {
        props: {
          activity,
        }
      }
    }
</script>

<script>
    import Blockquote from '$lib/components/markdown/Blockquote.svelte' 
    import Link from '$lib/components/markdown/Link.svelte'
    export let activity;

    async function getActivity() {
        activity = await fetch('../api/activity.json').then((response => response.json()));
    }
</script>



In this post, I explain how you create a SvelteKit Endpoint that fetches data from an external public API. The endpoint is called inside the `load` function to be able to display an activity when the page loads. A button triggers a function when clicked, which requests a new activity and replaces the old activity.

It makes me happy when I solve a problem by reading documentation instead of watching video tutorials. Documentation usually makes me feel really lost. I hope that's normal. Every so often, part of the documentation clicks, and that's when learning occurs. Today, the SvelteKit documentation on endpoints clicked.
## What we're making

<div class="p-4 bg-gray-200 grid place-items-center">
      <button on:click={getActivity} class="mx-auto"><i>Still bored? Click me for more!</i></button>
      <h3 class="text-center mx-auto text-xl pb-4 text-primary font-semibold">{activity.data.activity}</h3>

</div>
<br>
<Link class="mt-4" href="http://koenraijer.io/blog/svelteKit-endpoints#complete-code">Skip to the code</Link>

## Why not just request data straight from the load function?

The load function runs both server- and client-side, so anything in there is exposed to the client. If you're just fetching insensitive data, that's not a problem. But then I tried making an upvote button, that would sent a mutation request with an updated number of upvotes to the server when the button was clicked. This function has to be declared outside of the load function, to allow client-side execution. The mutation request requires an authorization token, which tells GraphCMS we're allowed to mutate that piece of content. Technically, we could narrow down the authorization to only allow updating the upvotes. To be sure nothing's exposed to the client that shouldn't be, t's better to just hide the token from the client. You can do that by moving the request to the server. 

An endpoint is a function that is executed on the server, which you can call from the client. It acts as an intermediary between the exposed client and your sensitive data.

<Blockquote url="https://kit.svelte.dev/docs/routing#endpoints" name="SvelteKit Docs">Endpoints are modules written in .js (or .ts) files that export request handler functions corresponding to HTTP methods. Their job is to make it possible to read and write data that is only available on the server (for example in a database, or on the filesystem).</Blockquote>

## Creating the endpoint
Create a file and call it `activity.json.js`. Inside, paste this:

```js
export async function get() {
    const data = await fetch('https://www.boredapi.com/api/activity').then((response => response.json()))

    return {
        body: {data}
    }
}
```

This is what SvelteKit calls a request handler: a function that handles an HTTP request. HTTP requests are the basis of client-server communication. The GET method is an example of an HTTP request, that can only *retrieve* data. 

In this request, we use a public API that gives us one random activity for every request. 

Looking at our code, we have an asynchronous function, meaning the client can continue doing other stuff while we *await* our data.

The first line of our get function is almost semantic: we await the request, then convert the response to JSON. The result is stored inside of `data`. Lastly, we return our data in the body of the function. 

## Calling the endpoint

Create a module wherever you want to use the data our endpoint fetches, with this code in it:

```js
<script context="module">
export const load = async ({ fetch }) => {
    const activity = await fetch('api/activity.json').then((response => response.json()))
    return {
        props: {
            activity
        }
    }
}
</script>
```
**Note:** you must pass `{fetch}` as a parameter to the load function. This is a different function from fetch in vanilla JS, and it's required to make this work. 

The code calls our endpoint inside of SvelteKit's `load` function, which runs before the page is mounted. This means no loading time, so no need to work with `{#await}`. In the load function, we do something similar to what we did in the endpoint. We await our SvelteKit fetch request as it is turned into JSON, then return our `activity` as a prop. The prop part is a SvelteKit convention. Lastly, inside the normal script, we export our `activity` to access it (I still think it's confusing to call this exporting instead of importing). 

```js
<script>
    export let activity;
</script>
```

## Adding a button that requests a new activity

We need our button to trigger a function when we click on it. The function should request another activity, then update our activity variable. 

```svelte
<button on:click={getActivity}>New activity</button>
```

Let's make the `getActivity` function:

```js
async function getActivity() {
    activity = await fetch('../api/activity.json').then((response => response.json()));
}
```

## Complete code
```svelte
<script context="module">
    export const load = async ({ fetch }) => {
      const activity = await fetch('../api/endpoint.json').then((response => response.json()))

      return {
        props: {
          activity,
        }
      }
    }
</script>

<script>    
    export let activity;

    async function getActivity() {
        activity = await fetch('../api/activity.json').then((response => response.json()));
    }
</script>

<div>
      <strong>Bored?</strong>
      <span>Go and {activity.data.activity.toLowerCase()}</span>
      <button on:click={getActivity}>something else</button>
</div>
```

<style>
    div { background: hsl(--s); }
</style>