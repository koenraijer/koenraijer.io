<script>
  import { active_heading } from "$lib/stores";
  import {fade} from 'svelte/transition'
  
</script>
<nav class="fixed bg-white/90 top-0 w-full h-fit px-4 py-2 !z-50 text-base">
  <a class="font-[500] hover:underline" href="/">Koen Raijer</a> 
  <div class="relative inline w-screen"><span class="text-gray-500">|</span>
    {#key $active_heading}
      <span in:fade class=" text-gray-500"> {$active_heading}</span>
    {/key}
  </div>

</nav>