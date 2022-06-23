<script>
    export let post, index, searchedPosts
</script>

<a class="flex gap-4 pb-6 flex-row sm:flex-nowrap flex-wrap-reverse group justify-start" href="{post[1].path}" sveltekit:prefetch>
    
    <div class="w-full">
        <div class="inline-flex w-full">
            <time class="text-sm mb-0 inline text-gray-500 mr-2" datetime="{post[1].meta.date}">{new Date(post[1].meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time> <span class="text-sm font-bold inline">
        </div>

      <div class="flex flex-row row-nowrap justify-start">
        <h2 class="text-lg font-[500] group-hover:underline ">
            {post[1].meta.title}
        </h2>
      </div>
      <h2 class="text-base text-gray-500 font-normal leading-snug my-2 mt-1">{post[1].meta.subtitle}</h2>

    </div>
    {#if post[1].meta.image && post[1].meta.show_image}
    <img class="mx-auto sm:w-48 inline-flex flex-col items-center aspect-auto object-cover rounded-xl" alt="Banner image for '{post[1].meta.title}'" src="{post[1].meta.image}">
    {/if}
  </a>
  {#if searchedPosts.length - 1 !== index}
  {/if}