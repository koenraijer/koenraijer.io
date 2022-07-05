
<script>
  import {browser} from '$app/env'
  import { active_heading, page_offset } from "$lib/stores";
  import {navigating} from '$app/stores'
  export let currentRoute;

  let array = currentRoute.trim().split("/")
  let title = array[array.length - 1].replace(/^\w/, (c) => c.toUpperCase());

  $: heading = $active_heading === null || $active_heading === undefined ? title : $active_heading

  const setProgressBar = () => {
    if(browser) {
      let scrollDist = document.documentElement.scrollTop || document.body.scrollTop;
      let progressWidth = (scrollDist / (document.body.scrollHeight - document.documentElement.clientHeight)) * 100;
      progressBar.style.width = progressWidth + "%";
      $page_offset = scrollDist;
    }
  }
  
  let progressBar;
  let navBar

  $: if(browser) {
		if($navigating) {
			$active_heading = null
      }
	}
  /*
  afterNavigate(({ from, to, cancel }) => {
    navBar.classList.remove('hidden')
  })
  beforeNavigate(({ from, to, cancel }) => {
      navBar.classList.add('hidden')
  });
  */
</script>

<svelte:window on:load={setProgressBar} on:scroll={setProgressBar}/>

<div id="progressBar" class="h-1 bg-gray-200 dark:bg-gray-500 fixed top-0 left-0  w-0 !z-[55]" bind:this={progressBar}></div>

<nav class="absolute w-full px-4 py-2">
  <a href="/" alt="Home" class="flex hover:text-inherit flex-row row-nowrap gap-1 transition-all text-gray-300 items-center" >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
    <span>Home</span>
  </a>
</nav>

<!--
<nav bind:this={navBar} class="fixed bg-white dark:bg-[#212121e6] top-0 w-full h-fit px-4 py-2 !z-50 text-base">
  <a class="font-[500] hover:underline whitespace-nowrap dark:text-white" href="/">Koen Raijer&nbsp;</a> 
  <span class="text-gray-500">|</span>
      {#key heading}
        <span in:fade class=" text-gray-500"> {heading}</span>
      {/key}
</nav>
-->
