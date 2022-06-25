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
	import {theme, active_heading, page_height, page_offset} from '$lib/stores'
	import {browser} from '$app/env'
	import {navigating} from '$app/stores'
	
	$: if ($theme === 'dark') {
		if(browser) {
			document.documentElement.classList.add('dark')
		}
	} else if($theme === 'light') {
		if(browser) {
			document.documentElement.classList.remove('dark')
		}
	}

	$: if(browser) {
		if($navigating) {
			$active_heading = null
      }
	}


	let old_page_offset
	let scroll_up;

	$: if(browser) {
		$page_height = document.body.offsetHeight
			window.addEventListener('scroll', (e) => {
				$page_offset = window.pageYOffset;
				if (old_page_offset < $page_offset) {
					scroll_up = false;
				} else if (old_page_offset > $page_offset) {
					scroll_up = true;
				}
				old_page_offset = $page_offset;
				});
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

	<!--GoatCounter-->
	<script data-goatcounter="https://koenraijer.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
	
	<!--Preloading-->
	<link rel="preload" href="/avatar2.webp" as="image">
</svelte:head>


<div class="flex flex-col overflow-x-hidden min-h-screen">
	{#if currentRoute !== "/" }
		<Navbar {currentRoute} {page_height}/>
	{/if}
	{#key currentRoute}
		<main class="flex-grow pt-8 pb-8 md:pt-16 dark:bg-[#212121] dark:text-white" in:fade={{ duration: 75 }} out:fade={{ duration: 75 }}>
			<slot />
		</main>
	{/key}

	<Footer />
</div>

