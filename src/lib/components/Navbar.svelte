
<script>
  import {browser} from '$app/env'
  import { active_heading, page_offset } from "$lib/stores";
  import {navigating} from '$app/stores'
  import ThemeToggle from './ThemeToggle.svelte';
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

<nav class="relative w-full">
  <div class="absolute w-full">
    <div class="flex flex-row row-nowrap justify-between p-4 dark:text-white">
      <a class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm" aria-label="Home" rel="noopener" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="h-5 w-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.5a8.3,8.3,0,0,1,2.6-5.9l80-72.7a8,8,0,0,1,10.8,0l80,72.7a8.3,8.3,0,0,1,2.6,5.9V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
      </a> 
      <ThemeToggle/>
    </div>

  </div>

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
