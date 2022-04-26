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
  import Link from '$lib/components/markdown/A.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import MultiSelect from 'svelte-multiselect'
  import {seo} from '$lib/stores'
  export let posts;
  let searchTerm = '';

  const post_types = ['essay', 'tutorial', 'snippet', 'note']
  
  let essay;
  let tutorial;
  let snippet;
  let note;

  // Convert object to array
  const postArray = Object.entries(posts);

  // Apply category filter
  $: categorizedPosts = postArray.filter((post) => {
      if (!essay && !tutorial && !snippet && !note)
          return true      
      if (essay && post[1].meta.category.toLowerCase().includes("essay"))
          return post[1].meta.category.toLowerCase().includes("essay");
      else if (tutorial && post[1].meta.category.toLowerCase().includes("tutorial"))
          return post[1].meta.category.toLowerCase().includes("tutorial");
      else if (snippet && post[1].meta.category.toLowerCase().includes("snippet"))
          return post[1].meta.category.toLowerCase().includes("snippet");
      else if (note && post[1].meta.category.toLowerCase().includes("note"))
          return post[1].meta.category.toLowerCase().includes("note");
  })

  // Apply searchterm
  $: searchedPosts = categorizedPosts.filter((post) => {
      if (post[1].meta.title.toLowerCase().includes(searchTerm.toLowerCase()))
          return post[1].meta.title.toLowerCase().includes(searchTerm.toLowerCase());
      else if (post[1].meta.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
          return post[1].meta.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      else if (post[1].meta.tags.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          // Note: this method has certain edge cases, e.g.: "ent,ba", which is where to tags are separated.
          return post[1].meta.tags.toString().toLowerCase().includes(searchTerm.toLowerCase())
  }).splice(0, amountLoaded);
  let amountLoaded = 50;

  // Spotlight post finder
  let spotlight = (postArray.find(post => post[1].path.includes("iterate-iterate-iterate")))[1]

 
	
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

  <section class="text-lg pb-12 md:pb-16 grid grid-cols-1 sm:grid-cols-4 gap-x-8 items-end">
    <div class="col-span-3 row-start-2 sm:row-start-1">
        <h1 class="text-4xl font-semibold sm:pt-0 pt-4 pb-2">Koen Raijer</h1>
      <h2 class="text-base">I'm a medicine student who dabbles in web development and data science. Currently building <Link href="https://studio.koenraijer.io">websites for the KiKa Foundation</Link>.</h2>
    </div>
    <img height="200" width="200" alt="Avatar of Koen" class="mask mask-circle aspect-square sm:col-span-1 row-start-1 h-28 w-28 sm:w-auto sm:h-auto" src="/avatar2.webp">
  </section>

  <h2 class="text-3xl font-semibold mb-2">Latest posts</h2>
  <!--<h3 class="text-gray-500">I've written <div class="inline">{posts.length}</div> essays, notes, tutorials and snippets.</h3>-->
  <div class="relative w-full my-4 mt-2">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg class="w-5 h-5 text-base-content" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      </div>
      <!-- svelte-ignore a11y-autofocus -->
      <input autofocus bind:value={searchTerm} type="text" id="search-icon" class="block p-2 pl-10 w-full sm:w-3/6 bg-base-100 placeholder:text-neutral rounded-lg focus:placeholder:text-gray-300 border-2 border-gray-400 outline-none hover:border-base-content focus:border-base-content" placeholder="Search...">
  </div>

  <span>Filter:</span>
  
  <div class="inline-flex text-xs" role="group">
      <label class="p-1 border rounded-l-lg border-gray-400 {essay ? "bg-gray-200" : "bg-gray-100"}" for="essay">
          <input type="checkbox" name="essay" id="essay" class="hidden" bind:checked={essay}>
          Essays
      </label>
      <label class="p-1 border-gray-400 border-y {tutorial ? "bg-gray-200" : "bg-gray-100"}" for="snippet">
          <input type="checkbox" name="snippet" id="snippet" class="hidden" bind:checked={tutorial}>
          Tutorials
      </label>
      <label class="p-1 border-gray-400 border-y border-l {snippet ? "bg-gray-200" : "bg-gray-100"}" for="tutorial">
          <input type="checkbox" name="tutorial" id="tutorial" class="hidden" bind:checked={snippet}>
          Snippets
      </label>
      <label class="p-1 text-xs border-gray-400 border rounded-r-lg {note ? "bg-gray-200" : "bg-gray-100"}" for="note">
          <input type="checkbox" name="note" id="note" class="hidden" bind:checked={note}>
          Notes
      </label>
  </div>


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
          <button on:click={() => amountLoaded+=50} class="p-4 py-2 mt-4 font-[500] border-gray-400 border bg-gray-200 rounded hover:bg-gray-100 mx-auto w-fit">Load more</button>
      {/if}
  </div>
</div>


