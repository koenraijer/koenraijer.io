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
  import Link from '$lib/components/markdown/Link.svelte';
  import {seo} from '$lib/stores'
  export let posts;

  let searchTerm = '';

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
  const spotlight = (postArray.find(post => post[1].path.includes("iterate-iterate-iterate")))[1]

  // Spotlight effect (https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/) 
  let m = { x: 0, y: 0 };
	let cx;
  let cy;
  let svg;
  let div;
  let spotlightVisible = false;

	function handleMousemove(event) {
    // Get mouse coordinates
		m.x = event.clientX;
		m.y = event.clientY;

    // Translate to SVG coordinates
    const pt = svg.createSVGPoint();
    pt.x = m.x
    pt.y = m.y

    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())

    cx = svgP.x
    cy = svgP.y
	}
	
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
	<link rel="preload" href="/avatar.webp" as="image">
</svelte:head>

<div class="max-w-[80ch] mx-auto px-6 md:px-8 py-8 pb-0">
  <section class="text-lg pb-12 md:pb-16 grid grid-cols-1 sm:grid-cols-4 gap-x-4 items-center">
    <div class="col-span-3 row-start-2 sm:row-start-1">
      <h1 class="text-5xl font-semibold sm:pt-0 pt-4 pb-2">Koen Raijer</h1>
      <h2 class="text-base">I'm a medicine student who dabbles in computer science, learning stuff in public. Currently building <Link href="https://studio.koenraijer.io">websites for the KiKa Foundation</Link>.</h2>
    </div>
    <img height="150" width="150" alt="Avatar of Koen" class="rounded-full aspect-square sm:col-span-1 row-start-1 h-28 w-28 sm:w-auto sm:h-auto" src="/avatar.webp">
  </section>
  <section class="hidden">
    <div on:mousemove={handleMousemove} bind:this={div} on:focus={() => spotlightVisible = true} on:mouseover={() => spotlightVisible = true} on:mouseout={() => spotlightVisible = false} on:blur={() => spotlightVisible = false} class="grid grid-cols-1 relative gap-4 mb-12 md:mb-16 overflow-hidden">
            <a class="group rounded-lg w-full bg-gradient-to-r sm:p-3 p-2 from-primary-content to-primary-content overflow-hidden grid items-stretch" href="{spotlight.path}" sveltekit:prefetch>
                <div class="bg-base-100 rounded-md p-4 flex flex-col flex-nowrap justify-between h-full">
                  <div class="p-4">
                    <h2 class="text-lg group-hover:underline font-semibold pb-2 md:pb-4">{spotlight.meta.title}</h2>
                    <p class="text-base pb-4 md:pb-6">{spotlight.meta.subtitle}</p>
                    <span class="text-sm text-neutral-content justify-end">{new Date(spotlight.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
            </a>

            <svg bind:this={svg} class="absolute pointer-events-none" width="150%" height="150%" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="grad" fx="0.5" fy="0.5" r="1" >
                  <stop stop-opacity="1" style="stop-color:#ffffff80" offset="0"/>
                  <stop stop-opacity="0" style="stop-color:#ffffff80" offset="0.3"/>
                </radialGradient>
              </defs>
              <circle r="75px" fill="url(#grad)" class="{spotlightVisible ? "opacity-1" : "opacity-0"} transition-opacity" {cx} {cy}></circle>
            </svg>
    </div>
  </section>

  <h2 class="text-3xl font-semibold mb-4">Latest posts</h2>
  <h3 class="text-base-content">I've written <div class="badge badge-secondary">{posts.length}</div> essays, notes, tutorials and snippets.</h3>
  <div class="relative w-full my-4 mt-2">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg class="w-5 h-5 text-base-content" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      </div>
      <input autofocus bind:value={searchTerm} type="text" id="search-icon" class="block p-2 pl-10 w-full bg-base-100 placeholder:text-neutral rounded-lg focus:placeholder:text-gray-300 border-2 border-gray-400 outline-none hover:border-base-content focus:border-base-content" placeholder="Search posts">
  </div>

  <span>Filter:</span>
  
  <div class="inline-flex" role="group">
      <label class="p-[0.375rem] border rounded-l-lg border-gray-400 {essay ? "bg-gray-200" : "bg-gray-100"}" for="essay">
          <input type="checkbox" name="essay" id="essay" class="hidden" bind:checked={essay}>
          Essays
      </label>
      <label class="p-[0.375rem] border-gray-400 border-y {tutorial ? "bg-gray-200" : "bg-gray-100"}" for="snippet">
          <input type="checkbox" name="snippet" id="snippet" class="hidden" bind:checked={tutorial}>
          Tutorials
      </label>
      <label class="p-[0.375rem] border-gray-400 border-y border-l {snippet ? "bg-gray-200" : "bg-gray-100"}" for="tutorial">
          <input type="checkbox" name="tutorial" id="tutorial" class="hidden" bind:checked={snippet}>
          Snippets
      </label>
      <label class="p-[0.375rem] border-gray-400 border rounded-r-lg {note ? "bg-gray-200" : "bg-gray-100"}" for="note">
          <input type="checkbox" name="note" id="note" class="hidden" bind:checked={note}>
          Notes
      </label>
  </div>


  <div class="flex flex-col justify-between flex-nowrap my-8 mt-12 gap-y-8">
      <div class="grid grid-cols-1 gap-y-10">
          {#if searchedPosts.length}
          {#each searchedPosts as post}
              <a class="group w-full grid grid-cols-1 gap-y-2" href="{post[1].path}" sveltekit:prefetch>
                  <div class="flex flex-row row-nowrap">
                      <h2 class="text-xl font-[500] group-hover:underline">
                          {#if post[1].meta.category === "tutorial"}
                              <div class="badge badge-primary py-3 mr-1 text-base-100 transform -translate-y-1">{post[1].meta.category}</div>
                          {:else if post[1].meta.category === "essay"}
                              <div class="badge badge-secondary py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
                          {:else if post[1].meta.category === "note"}
                              <div class="badge badge-ghost py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
                          {:else if post[1].meta.category === "snippet"}
                              <div class="badge badge-accent py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
                          {:else}
                              <div class="badge badge-ghost py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
                          {/if}
                          {post[1].meta.title}
                      </h2>
                  </div>
  
                  <h2 class="text-base leading-none">{post[1].meta.subtitle}</h2>
                  <time class="text-sm mb-4 inline text-gray-500" datetime="{post[1].meta.date}">{new Date(post[1].meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time> <span class="text-sm font-bold inline">
                  <hr>
              </a>
          {/each}
          {:else}
          <h2 class="text-lg">Nothing found for "{searchTerm}"</h2>
          {/if}
      </div>
      {#if posts.length > amountLoaded}
          <button on:click={() => amountLoaded+=50} class="btn btn-outline">Load more</button>
      {/if}
  </div>
</div>