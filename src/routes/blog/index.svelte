<script context="module">
    export const load = async ({ fetch }) => {
      const posts = await fetch('/api/blog.json').then((response => response.json()))
      return {
        props: {
           posts
        }
      }
    }
</script>

<script>
    import {theme} from '$lib/stores'
  import MultiSelect from 'svelte-multiselect'

  const post_types = ['essay', 'tutorial', 'snippet', 'note']

  let selected = []

  import NowPlaying from '$lib/components/NowPlaying.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import {seo} from '$lib/stores'
  export let posts;
  let searchTerm = ''
  
  let searchText = ''

  // Convert object to array
  const postArray = Object.entries(posts);

  // Apply category filter
  $: categorizedPosts = postArray.filter((post) => {
      if (selected.length === 0)
          return true      
      if (selected.includes('essay') && post[1].meta.category.toLowerCase().includes("essay"))
          return post[1].meta.category.toLowerCase().includes("essay");
      else if (selected.includes('tutorial') && post[1].meta.category.toLowerCase().includes("tutorial"))
          return post[1].meta.category.toLowerCase().includes("tutorial");
      else if (selected.includes('snippet') && post[1].meta.category.toLowerCase().includes("snippet"))
          return post[1].meta.category.toLowerCase().includes("snippet");
      else if (selected.includes('note') && post[1].meta.category.toLowerCase().includes("note"))
          return post[1].meta.category.toLowerCase().includes("note");
  })

  // Apply searchterm
  $: searchedPosts = categorizedPosts.filter((post) => {
      if (post[1].meta.title.toLowerCase().includes(searchText.toLowerCase()))
          return post[1].meta.title.toLowerCase().includes(searchText.toLowerCase());
      else if (post[1].meta.subtitle.toLowerCase().includes(searchText.toLowerCase()))
          return post[1].meta.subtitle.toLowerCase().includes(searchText.toLowerCase());
      else if (post[1].meta.tags.toString().toLowerCase().includes(searchText.toLowerCase()))
          // Note: this method has certain edge cases, e.g.: "ent,ba", which is where to tags are separated.
          return post[1].meta.tags.toString().toLowerCase().includes(searchText.toLowerCase())
  }).splice(0, amountLoaded);
  let amountLoaded = 25;	
</script>

<svelte:head>
	<title>{$seo.title}</title>
	<meta name="description" content={$seo.description} />

	<!--Facebook-->
	<meta property="og:image" content={$seo.openGraphURL} />
	<meta property="og:description" content={$seo.description} />
	<meta property="og:title" content={$seo.title} />

	<!--Twitter-->
	<meta name="twitter:title" content={$seo.title} />

	<!--Favicons-->
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
	<link rel="manifest" href="/favicon/site.webmanifest">

	<!--Preloading-->
	<link rel="preload" href="/avatar2.webp" as="image">
</svelte:head>

<div class="max-w-[75ch] mx-auto px-6 md:px-8">
  <h2 class="text-xl font-semibold mb-2">Latest posts</h2>
  <MultiSelect bind:searchText bind:selected options={post_types} ulOptionsClass="!shadow-none {$theme === "light" ? "!" : ""}bg-gray-100 dark:bg-[#373636] !rounded-xl mt-1" liSelectedClass="inline-flex bg-gray-200 rounded-lg my-1 dark:bg-gray-50/10 py-1 px-2 mr-2" liOptionClass="hover:bg-gray-50 dark:bg-gray-50/10" outerDivClass="sm:w-4/6 w-full dark:border-gray-50/10 dark:focus-within:border-gray-200 focus-within:border-[#212121]"/>

  <div class="flex flex-col justify-between flex-nowrap my-8 mt-12 gap-y-8">
      <div class="grid grid-cols-1 gap-y-4">
          {#if searchedPosts.length}
          {#each searchedPosts as post, index}
             <PostCard {post} {searchedPosts} {index}/>
          {/each}
          {:else}
          <h2 class="text-lg">Nothing found for "{searchTerm}"</h2>
          {/if}
      </div>
      {#if posts.length > amountLoaded}
          <button on:click={() => amountLoaded+=50} class="p-4 py-2 mt-4 font-[500] text-sm bg-gray-200 rounded hover:bg-primary transition-colors w-fit">Load more</button>
      {/if}
  </div>
</div>