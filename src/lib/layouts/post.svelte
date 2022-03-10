<script context="module">
  import P from '$lib/components/markdown/P.svelte'
  import Blockquote from '$lib/components/markdown/Blockquote.svelte'
  export { P as p}
  export { Blockquote as blockquote}
</script>
<script>
    import ToC from "$lib/components/ToC.svelte";
    import {seo} from '$lib/stores'
    export let title
    export let subtitle
    export let date
    export let updated;
</script>

<svelte:head>
  <title>{title}</title>
	<meta name="description" content="{title} - {subtitle}" />

	<!--Facebook-->
	<meta property="og:image" content={$seo.openGraphURL} />
	<meta property="og:description" content="{title} - {subtitle}" />
	<meta property="og:title" content={title} />

	<!--Twitter-->
	<meta name="twitter:title" content={title} />
</svelte:head>

<article class="relative text-base max-w-[55ch] mx-auto px-4 md:px-8 prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-semibold prose-a:no-underline">
  <time class="text-sm" datetime="{date}">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>. <span class="text-sm font-bold">Last updated: </span><time class="text-sm" datetime="{updated}">{new Date(updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>. 
  <h1 class="pb-4 font-[500]">{title}</h1>

  <ToC allowedHeadings={['h2', 'h3', 'h4', 'h5', 'h6']} />
  
  <slot></slot>
</article>