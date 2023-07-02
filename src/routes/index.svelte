<script>
  import NowPlaying from '$lib/components/NowPlaying.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import A from '$lib/components/markdown/A.svelte';
  import {seo} from '$lib/stores'

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
    <Hero/>

  <article class="prose dark:prose-invert hover:prose-a:no-underline hover:prose-headings:underline hover:prose-h1:no-underline dark:prose-pre:bg-[#333] w-full mx-auto mb-16 pt-8 prose-p:text-base">
    <p>With a background in medicine and data science, I operate where computer meets mind, where numbers meet qualia, where new meets old.</p>

    <p>The next couple years may lead me into a career in psychiatry and/or a PhD in mental health technology, and/or medical science data consultancy work.</p>

    <p>Some topics I enjoy learning about are metascience/philosophy of science, cognitive biases and heuristics, phenomenological psychopathology, and the philosophy of madness. I enjoy reading science fiction/fantasy and Dutch literature. Weight lifting and building superfluous web tools are my favourite non-social pastimes.</p>

    <p>I have plans to start using Obsidian as a CMS for my static Markdown blog, but in the meantime, consider visiting <A href="/blog" no_target>my old blog</A>. In the future, this website will also house books I've read and a digital version of my CV.</p>
  </article>
</div>