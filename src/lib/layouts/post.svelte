<script context="module">
  import A from '$lib/components/markdown/A.svelte'
  import Blockquote from '$lib/components/markdown/Blockquote.svelte'
  export { A as a}
  export { Blockquote as blockquote}
</script>
<script>
    import {seo} from '../stores.js'
    import ToC from "$lib/components/ToC.svelte";
    import Image from '$lib/components/Image.svelte'
    import Giscus from '@giscus/svelte'
    export let image
    export let show_image = false;
    export let title
    export let subtitle
    export let date
    export let updated;
    export let toc = true;

    $seo.title = title;
    $seo.description = title + " - " + subtitle;
    if(image)
      $seo.openGraphURL = "https://www.koenraijer.io" + image;

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

<article class="relative max-w-[75ch] mx-auto px-6 md:px-8 pt-8">
  <div class="text-base prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-[500] prose-a:no-underline !text-white dark:prose-p:text-white dark:prose-headings:text-white dark:prose-a:text-primary dark:prose-li:text-white dark:prose-code:text-white dark:prose-strong:text-white dark:prose-[time]:text-white">
    <h1 class="pb-4 text-2xl">{title}</h1>
    {#if show_image}
      <Image alt="Banner image for post with title: {title}" src="{image}" halfbleed />
    {/if}
    {#if toc}
      <time title="Date first published" class="text-sm text-gray-500" datetime="{date}">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time> (<time title="Date of last major modification" class="text-sm" datetime="{updated}">{new Date(updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>)
      <ToC title={title} allowedHeadings={['h2', 'h3', 'h4', 'h5', 'h6']} />
    {:else}
      <time title="Date first published" class="text-sm text-gray-500" datetime="{date}">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time> (<time title="Date of last major modification" class="text-sm" datetime="{updated}">{new Date(updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>)
      <hr class="mt-2">
    {/if}
    <slot></slot>

    <div class="">
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