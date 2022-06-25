<script>
  import { active_heading } from "$lib/stores";
  import {fade} from 'svelte/transition'
  export let currentRoute;

  let array = currentRoute.trim().split("/")
  let title = array[array.length - 1].replace(/^\w/, (c) => c.toUpperCase());

  $: heading = $active_heading === null || $active_heading === undefined ? title : $active_heading
</script>

<nav class="fixed bg-white/90 dark:bg-[#212121e6] top-0 w-full h-fit px-4 py-2 !z-50 text-sm">
  <a class="font-[500] hover:underline whitespace-nowrap" href="/">Koen Raijer&nbsp;</a> 
  <span class="text-gray-500">|</span>
      {#key heading}
        <span in:fade class=" text-gray-500"> {heading}</span>
      {/key}
</nav>