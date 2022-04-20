<script>
    import NowPlaying from "./NowPlaying.svelte";
</script>
<footer class="footer py-10 px-6 md:px-8 w-full max-w-[75ch] text-sm mx-auto grid-cols-1 sm:grid-cols-3">
    <div class="justify-self-start">
      <a sveltekit:prefetch href="/">Home</a>
      <a sveltekit:prefetch href="/dashboard">Dashboard</a>
    </div> 
    <div class="justify-self-start">
      <a class="" target="_blank" aria-label="Github" rel="noopener" href="https://github.com/koenraijer/">GitHub</a>
      <a target="_blank" aria-label="LinkedIn" rel="noopener" href="https://www.linkedin.com/in/koen-raijer-3495a7127/">LinkedIn</a>
      <a class="" target="_blank" aria-label="LinkedIn" rel="noopener" href="https://twitter.com/koenraijer">Twitter</a>
    </div> 
    <div class="justify-self-end">
        <NowPlaying/>
    </div>
  </footer>

<style>
    a {
        @apply hover:underline mb-2
    }
</style>