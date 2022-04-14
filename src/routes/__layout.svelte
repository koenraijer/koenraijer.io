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

	<!--Preloading-->
	<link rel="preload" href="/avatar.webp" as="image">
</svelte:head>


<div class="flex flex-col overflow-x-hidden min-h-screen">
	<Navbar />

	{#key currentRoute}
		<main class="flex-grow py-8 md:py-16" in:fade={{ duration: 75 }} out:fade={{ duration: 75 }}>
			<slot />
		</main>
	{/key}

	<Footer />
</div>

