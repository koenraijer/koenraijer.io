<script>
  import { active_heading, page_height, page_offset } from "$lib/stores";
  import {fade} from 'svelte/transition'
  import {browser} from '$app/env'
import P from "./markdown/P.svelte";
  export let currentRoute;

  let array = currentRoute.trim().split("/")
  let title = array[array.length - 1].replace(/^\w/, (c) => c.toUpperCase());

  $: heading = $active_heading === null || $active_heading === undefined ? title : $active_heading

  let progress = 0;

  const setProgressBar = () => {
    if(browser) {
      let scrollDist = document.documentElement.scrollTop || document.body.scrollTop;
      let progressWidth = (scrollDist / (document.body.scrollHeight - document.documentElement.clientHeight)) * 100;
      progressBar.style.width = progressWidth + "%";
      console.log(progressWidth)
    }
  }
  
  let progressBar;
</script>

<svelte:window on:scroll={setProgressBar}/>

<div class="h-1 fixed top-0 left-0 bg-black w-0 !z-50" bind:this={progressBar}></div>
<nav class="fixed bg-white/90 dark:bg-[#212121e6] top-0 w-full h-fit px-4 py-2 !z-50 text-sm">
  <div class="relative w-full h-1 transition-[width]">  </div>
  <a class="font-[500] hover:underline whitespace-nowrap dark:text-white" href="/">Koen Raijer&nbsp;</a> 
  <span class="text-gray-500">|</span>
      {#key heading}
        <span in:fade class=" text-gray-500"> {heading}</span>
      {/key}
</nav>