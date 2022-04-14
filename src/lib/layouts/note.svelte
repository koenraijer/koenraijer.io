<script context="module">
    import Blockquote from '$lib/components/markdown/Blockquote.svelte'
    export { Blockquote as blockquote}
  </script>
  <script>
      import {seo} from '$lib/stores'
      export let subtitle
      export let title
      export let date
      export let updated
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

  <article class="max-w-[60ch] text-base mx-auto px-4 md:px-8 prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-semibold prose-a:no-underline">
    <time class="text-sm" datetime="{date}">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>. <span class="text-sm italic">Updated: </span><time class="text-sm" datetime="{updated}">{new Date(updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>. 
    <h1 class="pb-8 md:pb-12 font-[500]">{title}</h1>
  
      <slot></slot>

  </article>
