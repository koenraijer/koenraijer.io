<script context="module">
  import A from '$lib/components/markdown/A.svelte'
  import Blockquote from '$lib/components/markdown/Blockquote.svelte'
  import {theme} from '$lib/stores'
  export { A as a}
  export { Blockquote as blockquote}
</script>
<script>
    import {seo} from '../stores.js'
    import ToC from "$lib/components/ToC.svelte";
    import Image from '$lib/components/Image.svelte'
    import Giscus from '@giscus/svelte'
    import ToTop from '$lib/components/toTop.svelte';
    import {browser} from '$app/env'
    import {page_offset} from '$lib/stores'
    
    export let image
    export let show_image = false;
    export let title
    export let subtitle
    export let date
    export let updated = '';
    export let toc = true;

    $seo.title = title;
    $seo.description = title + " - " + subtitle;
    if(image)
      $seo.openGraphURL = "https://www.koenraijer.io" + image;

      const setProgressBar = () => {
        if(browser) {
          let scrollDist = document.documentElement.scrollTop || document.body.scrollTop;
          let progressWidth = (scrollDist / (document.body.scrollHeight - document.documentElement.clientHeight)) * 100;
          progressBar.style.width = progressWidth + "%";
          $page_offset = scrollDist;
        }
      }
      
      let progressBar;
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
</svelte:head>


<svelte:window on:load={setProgressBar} on:scroll={setProgressBar}/>

<div id="progressBar" class="h-1 bg-gray-300 dark:bg-gray-400 fixed top-0 left-0  w-0 !z-[55]" bind:this={progressBar}></div>

<article class="prose dark:prose-invert hover:prose-a:no-underline hover:prose-headings:underline hover:prose-h1:no-underline dark:prose-pre:bg-[#333] w-full mx-auto mb-16 px-6 md:px-8 pt-8">
    <time title="Date first published" class=" text-gray-400" datetime="{date}">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
    {#if updated}
      <time title="Date of last major modification" class="ml-2 p-[0.2rem] text-sm border-b border-l border-gray-500 rounded-bl" datetime="{updated}">{new Date(updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
    {/if}
    <h1 class="mt-2 text-3xl font-bold hover:no-underline">{title}</h1>

    {#if show_image}
      <Image alt="Banner image for post with title: {title}" src="{image}" halfbleed />
    {/if}

    {#if toc}
      <ToC title={title} allowedHeadings={['h2', 'h3', 'h4']} />
    {/if}

    <slot></slot>

    <div class="mt-12">
      <Giscus
      repo="koenraijer/utterances"
      repoId="R_kgDOHLAsiQ"
      category="Announcements"
      categoryId="DIC_kwDOHLAsic4COjlc"
      mapping="pathname"
      term="Welcome to @giscus/svelte component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={$theme === "light" ? "light" : "transparent_dark"}
      lang="en"
      />
    </div>
</article>
<ToTop/>
