<script>
    // @ts-ignore
    import {browser} from '$app/env'
    import {page_offset} from '$lib/stores'

    $: visible = $page_offset > 60 ? true : false;

    function toTop() {
        if(browser) {
            document.body.scrollTop = 0
            // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }
</script>

<button class="fixed hidden sm:flex right-4 bottom-4 opacity-0 transition-all px-3 py-1 rounded-md items-center bg-gray-100 decoration-none hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm aspect-square" class:visible on:click={toTop} >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-5 h-5"  fill="currentColor"  viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="216" x2="128" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="56 112 128 40 200 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
</button>

<style>
    .visible {
        @apply opacity-100
    }
</style>