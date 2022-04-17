<script>
    export let post, index, searchedPosts
</script>

<a class="flex gap-4 pb-4 flex-row sm:flex-nowrap flex-wrap-reverse group justify-start" href="{post[1].path}" sveltekit:prefetch>
    <div class="">
      <div class="flex flex-row row-nowrap justify-start">
        <h2 class="text-xl font-[500] group-hover:underline">
            {#if post[1].meta.category === "tutorial"}
                <div class="badge badge-primary py-3 mr-1 text-base-100 transform -translate-y-1">{post[1].meta.category}</div>
            {:else if post[1].meta.category === "essay"}
                <div class="badge badge-secondary py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
            {:else if post[1].meta.category === "note"}
                <div class="badge badge-ghost py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
            {:else if post[1].meta.category === "snippet"}
                <div class="badge badge-accent py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
            {:else}
                <div class="badge badge-ghost py-3 mr-1 transform -translate-y-1">{post[1].meta.category}</div>
            {/if}
            {post[1].meta.title}
        </h2>
      </div>
      <h2 class="text-base leading-snug my-2">{post[1].meta.subtitle}</h2>
      <time class="text-sm mb-0 inline text-gray-500" datetime="{post[1].meta.date}">{new Date(post[1].meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time> <span class="text-sm font-bold inline"> 
    </div>
    {#if post[1].meta.image}
    <img class="w-5/6 mx-auto sm:w-48 inline-flex flex-col items-center aspect-auto object-contain" alt="Banner image for '{post[1].meta.title}'" src="{post[1].meta.image}">
    {/if}
  </a>
  {#if searchedPosts.length - 1 !== index}
  <hr class="col-span-4">
  {/if}