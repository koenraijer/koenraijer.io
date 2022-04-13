<script>
    import GithubIcon from '$lib/components/svg/github-icon.svelte'
    import LinkedinIcon from '$lib/components/svg/linkedin-icon.svelte';
    import TwitterIcon from '$lib/components/svg/twitter-icon.svelte';
</script>

<nav class="flex flex-row flex-nowrap justify-between px-6 md:px-8 text-base text-base-100 bg-slate-900">
<div class="flex items-center justify-start py-4">
  <h1 class="font-normal text-lg"><a href="/">Koen&nbsp;Raijer</a></h1>
</div>
<div class="flex items-center space-between">
    <a class="mr-4" target="_blank" aria-label="Github" rel="noopener" href="https://github.com/koenraijer/"><GithubIcon/></a>
    <a target="_blank" aria-label="LinkedIn" rel="noopener" href="https://www.linkedin.com/in/koen-raijer-3495a7127/"><LinkedinIcon/></a>
    <a class="ml-4" target="_blank" aria-label="LinkedIn" rel="noopener" href="https://twitter.com/koenraijer"><TwitterIcon/></a>
</div>
</nav>
  
