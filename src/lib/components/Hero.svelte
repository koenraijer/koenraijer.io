<script>
    import NowPlaying from "./NowPlaying.svelte";

</script>
<section class="pb-4 md:pb-8 grid grid-cols-1 sm:grid-cols-4 gap-x-8 items-start dark:bg-zinc-800 bg-zinc-100 px-6 md:px-8 pt-4 md:pt-6 rounded-lg">
    <div class="col-span-3 row-start-2 sm:row-start-1">
        <h1 class="text-2xl font-[500] sm:pt-0 pt-4 pb-2">Koen Raijer</h1>
      <h2 class="leading-7 text-base">Medicine student and aspiring psychiatrist / data scientist.
      </h2>
      <div class="flex flex-row flex-wrap gap-2 mt-6 mb-2">
            <a class="social bg-gray-100 hover:bg-[#333] hover:text-white dark:text-white dark:bg-gray-50/10 dark:hover:bg-black dark:hover:text-white" target="_blank" aria-label="Github" rel="noopener" href="https://github.com/koenraijer/">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z"></path></svg>
                &nbsp;Github
            </a>
            <a class="social hover:bg-[#0077b5] dark:hover:bg-[#0077b5] hover:text-white dark:bg-gray-50/10 text-sm" target="_blank" aria-label="Github" rel="noopener" href="https://www.linkedin.com/in/koen-raijer-3495a7127/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="h-5 w-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><rect x="36" y="36" width="184" height="184" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></rect><line x1="124" y1="120" x2="124" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="84" y1="120" x2="84" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><path d="M124,148a28,28,0,0,1,56,0v28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><circle cx="84" cy="80" r="16"></circle></svg>   
                &nbsp;LinkedIn    
            </a>
            <a class="social hover:bg-[#f4f1ea] dark:hover:text-gray-900 hover:text-black dark:hover:bg-[#f4f1ea] dark:bg-gray-50/10 text-sm" target="_blank" aria-label="LinkedIn" rel="noopener" href="https://www.goodreads.com/koenraijer/">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M184,20a12,12,0,0,0-12,12v4.22A67.94,67.94,0,0,0,60,88v24a67.94,67.94,0,0,0,112,51.78V168a44.05,44.05,0,0,1-44,44c-15,0-30.29-7.58-38.16-18.87a12,12,0,0,0-19.68,13.74C82.5,224.56,105.21,236,128,236a68.07,68.07,0,0,0,68-68V32A12,12,0,0,0,184,20ZM128,156a44.05,44.05,0,0,1-44-44V88a44,44,0,0,1,88,0v24A44.05,44.05,0,0,1,128,156Z"></path></svg>
                &nbsp;Goodreads    
            </a>

            <a class="social hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm" target="_blank" aria-label="LinkedIn" rel="noopener" href="mailto:koenrayer@gmail.com">
                <svg xmlns="http://www.w3.org/2000/svg"  class="h-5 w-5" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM193.15,68,128,127.72,62.85,68ZM44,188V83.28l75.89,69.57a12,12,0,0,0,16.22,0L212,83.28V188Z"></path></svg>
                &nbsp;Email
            </a>
            <div class="sm:hidden block">
                <NowPlaying />
            </div>
        </div>
    </div>

    <img height="16" width="16" alt="Avatar of Koen" class="mask mask-circle aspect-auto sm:col-span-2 row-start-1 w-32 sm:w-5/6 sm:h-auto col-span-3 mb-2 md:mt-6" src="/avatar3.webp">
</section>

