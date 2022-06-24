<script>
        import Link from '$lib/components/markdown/A.svelte'
        import theme from '$lib/stores';
        import {browser} from "$app/env"
        import NowPlaying from '$lib/components/NowPlaying.svelte'
        let light_theme = true;

        $: light_theme = $theme === 'light';
        // https://rodneylab.com/using-local-storage-sveltekit/
</script>
<section class="pb-12 md:pb-16 grid grid-cols-1 sm:grid-cols-4 gap-x-8 items-end">
    <div class="col-span-3 row-start-2 sm:row-start-1">
        <h1 class="text-3xl font-[500] sm:pt-0 pt-4 pb-4">Koen Raijer</h1>
      <h2 class="leading-7">Medicine student and aspiring psychiatrist / data scientist.<br> Building <Link href="https://studio.koenraijer.io">websites for the KiKa Foundation</Link>.</h2>
      <div class="flex flex-row flex-wrap gap-2 items-stretch mt-4">
            <a class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm" aria-label="LinkedIn" rel="noopener" href="/dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="h-5 w-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="24 128 56 128 96 40 160 208 200 128 232 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
                &nbsp;Dashboard
            </a> 
            <a class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-[#333] dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm" target="_blank" aria-label="Github" rel="noopener" href="https://github.com/koenraijer/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="fill-current h-4 w-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                &nbsp;Github
            </a>
            <a class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-[#0077b5] hover:text-white dark:bg-gray-50/10 text-sm" target="_blank" aria-label="Github" rel="noopener" href="https://www.linkedin.com/in/koen-raijer-3495a7127/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="h-5 w-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><rect x="36" y="36" width="184" height="184" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></rect><line x1="124" y1="120" x2="124" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="84" y1="120" x2="84" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><path d="M124,148a28,28,0,0,1,56,0v28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><circle cx="84" cy="80" r="16"></circle></svg>        
            </a>
            <a class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-[#1DA1F2]  hover:text-white dark:bg-gray-50/10 text-sm" target="_blank" aria-label="LinkedIn" rel="noopener" href="https://twitter.com/koenraijer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="h-5 w-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
            </a>
            <a class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm" target="_blank" aria-label="LinkedIn" rel="noopener" href="mailto:koenrayer@gmail.com">
                <svg xmlns="http://www.w3.org/2000/svg" width=16 height=16 class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="224 56 128 144 32 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56a0,0,0,0,1,0,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><line x1="110.5" y1="128" x2="34.5" y2="197.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="221.5" y1="197.7" x2="145.5" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
            </a>
            <button on:click={() => (light_theme ? theme.set('dark') : theme.set('light'))} class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm" target="_blank" aria-label="LinkedIn" rel="noopener" href="mailto:koenrayer@gmail.com">
                {#if light_theme } <!--Show moon-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
                {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="128" y1="28" x2="128" y2="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="198.7" y1="57.3" x2="204.4" y2="51.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="228" y1="128" x2="236" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="198.7" y1="198.7" x2="204.4" y2="204.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="228" x2="128" y2="236" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="57.3" y1="198.7" x2="51.6" y2="204.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="28" y1="128" x2="20" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="57.3" y1="57.3" x2="51.6" y2="51.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
                {/if}
            </button>
            <NowPlaying/>
        </div>
    </div>

    <img height="200" width="200" alt="Avatar of Koen" class="mask mask-circle aspect-square sm:col-span-1 row-start-1 h-28 w-28 sm:w-auto sm:h-auto" src="/avatar2.webp">
</section>