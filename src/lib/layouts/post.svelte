<script context="module">
  import A from '$lib/components/markdown/A.svelte'
  import Blockquote from '$lib/components/markdown/Blockquote.svelte'
  export { A as a}
  export { Blockquote as blockquote}
</script>
<script>
    import ToC from "$lib/components/ToC.svelte";
    import {seo} from '$lib/stores'
    import Giscus from '@giscus/svelte'
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

<article class="relative max-w-[75ch] mx-auto px-6 md:px-8">
  <div class="text-base prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-semibold prose-a:no-underline">
    <time class="text-sm" datetime="{date}">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>, <svg class="h-5 w-5 inline fill-gray-500" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="80" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="169.6" y1="152" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="184.2 99.7 224.2 99.7 224.2 59.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><path d="M190.2,190.2a88,88,0,1,1,0-124.4l34,33.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg> <time class="text-sm" datetime="{updated}">{new Date(updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>.
    <h1 class="pb-4 text-4xl">{title}</h1>
  
    <ToC allowedHeadings={['h2', 'h3', 'h4', 'h5', 'h6']} />
    
    <slot></slot>
  
    <div class="">
      <hr>
      <Giscus
      repo="koenraijer/utterances"
      repoId="R_kgDOHLAsiQ"
      category="Announcements"
      categoryId="DIC_kwDOHLAsic4COjlc"
      mapping="url"
      term="Welcome to @giscus/svelte component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      />
    </div>
  </div>

</article>