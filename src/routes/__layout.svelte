<script context="module">
	export const load = ({ url }) => {
		const currentRoute = url.pathname;

		return {
			props: {
				currentRoute
			}
		};
	};
</script>

<script>
	import '../app.css';
	import '../lib/prism.css';
	import { seo } from '$lib/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fade } from 'svelte/transition';

	export let currentRoute;
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

	<!--GoatCounter-->
	<script data-goatcounter="https://koenraijer.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
	
	<!--Preloading-->
	<link rel="preload" href="/avatar.webp" as="image">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"> 
</svelte:head>


<div class="flex flex-col overflow-x-hidden min-h-screen">
	<Navbar />

	{#key currentRoute}
		<main class="flex-grow py-8 md:py-16" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
			<slot />
		</main>
	{/key}

	<Footer />
</div>

