<script>
    import NowPlaying from "./NowPlaying.svelte";
    function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } 

</script>

<footer class="max-w-[75ch] mx-auto px-6 md:px-8">
    <div class="grid grid-cols-3 gap-x-4 justify-items-center">
        <NowPlaying/>
        <div class="flex flex-col flex-nowrap">
            <a sveltekit:prefetch href="/">Home</a>
            <a sveltekit:prefetch href="/dashboard">Dashboard</a>
        </div>
        <div class="flex flex-col flex-nowrap">
            <a class="" target="_blank" aria-label="Github" rel="noopener" href="https://github.com/koenraijer/">GitHub</a>
            <a target="_blank" aria-label="LinkedIn" rel="noopener" href="https://www.linkedin.com/in/koen-raijer-3495a7127/">LinkedIn</a>
            <a class="" target="_blank" aria-label="LinkedIn" rel="noopener" href="https://twitter.com/koenraijer">Twitter</a>
        </div>
    </div>
</footer>
<button on:click={topFunction} class="text-gray-400 w-full text-right text-xs my-4 mt-6 pr-6 md:pr-8">Back to top</button>


<style>
    a {
        @apply hover:underline mb-2
    }
</style>