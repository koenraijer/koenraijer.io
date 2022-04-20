<script>
    import GithubIcon from '$lib/components/svg/github-icon.svelte'
    import LinkedinIcon from '$lib/components/svg/linkedin-icon.svelte';
    import TwitterIcon from '$lib/components/svg/twitter-icon.svelte';
</script>

<nav class="max-w-[75ch] w-full mx-auto px-6 md:px-8 text-slate-500 py-4">
  <div class="flex flex-row flex-nowrap justify-between">
    <div class="flex items-center justify-start text-sm">
      <a sveltekit:prefetch class="pr-4 hover:text-primary hover:scale-[1.1] hover:font-[500] transition-all scale-100 duration-150 ease-bounce" href="/">Home</a> 
      <a sveltekit:prefetch class="hover:text-primary hover:scale-[1.1] hover:font-[500] transition-all scale-100 duration-150 ease-bounce" href="/dashboard">Dashboard</a>
    </div>
    <div class="flex items-center space-between">
        <a class="mr-4 " target="_blank" aria-label="Github" rel="noopener" href="https://github.com/koenraijer/"><GithubIcon/></a>
        <a target="_blank" aria-label="LinkedIn" rel="noopener" href="https://www.linkedin.com/in/koen-raijer-3495a7127/"><LinkedinIcon/></a>
        <a class="ml-4" target="_blank" aria-label="LinkedIn" rel="noopener" href="https://twitter.com/koenraijer"><TwitterIcon/></a>
    </div>
  </div>
</nav>
  
