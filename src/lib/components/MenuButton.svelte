<script>
    export let href = "/"
    import { getContext } from 'svelte';
    import A from '$lib/components/A.svelte';
    // Get the close function from the context.
    const close = getContext('close');
  </script>
  
  <A {href} classes="menu-button w-full mx-auto dark:font-thin font-normal" on:click={close}>
    <!--<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M208,20H72A36,36,0,0,0,36,56V224a12,12,0,0,0,12,12H192a12,12,0,0,0,0-24H60v-4a12,12,0,0,1,12-12H208a12,12,0,0,0,12-12V32A12,12,0,0,0,208,20ZM196,172H72a35.59,35.59,0,0,0-12,2.06V56A12,12,0,0,1,72,44H196Z"></path></svg>-->
    <span class="mx-auto"><slot></slot></span>
  </A>