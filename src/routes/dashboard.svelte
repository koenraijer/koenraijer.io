
<script>
    export let data;

    let limit = 25;
    let type = 'tracks';
    let time_range = 'medium_term';
    let tracks = true;
    
    $: console.log("type:" + type)
    $: console.log("time_range:" + time_range)
    $: console.log("limit:" + limit)

    async function getData() {
        console.log(new URLSearchParams({
                type,
                limit: limit.toString(),  
                time_range,
            }).toString())
        data = await fetch('./api/data.json', {
            method: 'POST',
            body: new URLSearchParams({
                type,
                limit: limit.toString(),  
                time_range,
            }).toString()
        }).then(res => res.json()).then(res => res.data.items)

        data = data;
        limit = limit;
        type = type;
        time_range = time_range

        tracks = type === "artists" ? false : true
    }
</script>

<article class="relative max-w-[75ch] mx-auto px-6 md:px-8 prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-semibold !prose-a:no-underline dark:text-white">
 
    <h1 class="text-3xl max-w-[50ch] mb-2 dark:text-white">Top tracks</h1>
    <p class="mb-8 dark:text-white">Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.</p>
    
    <select bind:value={type} name="type" id="type" class="select select-bordered select-sm max-w-xs my-4">
        <option value="artists">Artists</option>
        <option value="tracks">Tracks</option>
    </select>
    
    <select bind:value={time_range} name="time_range" id="time_range" class="select select-bordered select-sm max-w-xs">
        <option value="short_term">Short term (~4 weeks)</option>
        <option selected value="medium_term">Medium term (~6 months)</option>
        <option value="long_term">Long term (all available data)</option>
    </select>
    <select bind:value={limit} name="limit" id="limit" class="select select-bordered select-sm max-w-xs">
        <option value="10">10</option>
        <option selected value="25">25</option>
        <option value="50">50</option>
    </select>
    
    <button on:click={getData} class="inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white dark:bg-gray-50/10 text-sm" aria-label="LinkedIn" rel="noopener" href="/dashboard">
        Load
    </button> 
    
    <div>
        {#await getData()}
        <li class="flex flex-col flex-nowrap justify-between py-4 text-xl">
            Loading ...
        </li>
        {:then}   
            {#if tracks}
                {#each data as track, index}
                    <div class="not-prose flex flex-row row-wrap gap-4">
                        <div class="flex flex-row row-nowrap gap-4 items-center">
                            <span class="text-base text-gray-500 dark:text-gray-400 w-4">{index + 1}</span>
                            <img class="my-0 mb-4 mt-2 h-14 w-14 !aspect-square" alt="{track.name}'s album cover" height={track.album.images[1].height} width={track.album.images[1].width} src={track.album.images[1].url}>
                        </div>
                        <a class="flex flex-col flex-wrap group no-underline" href={track.external_urls.spotify} rel="noopener noreferrer" target="_blank">
                            <span class=" text-black dark:text-white text-ellipsis overflow-hidden inline-block whitespace-nowrap">{track.name}</span> 
                                <span class="!group-hover:no-underline text-gray-500 dark:text-gray-300 text-ellipsis overflow-hidden inline-block whitespace-nowrap">{track.artists[0].name}</span>
                        </a>
                    </div>
                {/each}
            {:else}
                    {#each data as track, index}
                    <div class="not-prose flex flex-row row-wrap gap-4">
                        <div class="flex flex-row row-nowrap gap-4 items-center">
                            <span class="text-base text-gray-500 dark:text-gray-400 w-4">{index + 1}</span>
                        </div>
                        <a class="flex flex-col flex-wrap group no-underline" href={track.external_urls.spotify} rel="noopener noreferrer" target="_blank">
                            <span class="!group-hover:no-underline text-gray-500 dark:text-gray-300 text-ellipsis overflow-hidden inline-block whitespace-nowrap">{track.artists[0].name}</span>
                        </a>
                    </div>
                    {/each}
            {/if}
        {/await}
    </div>


</article>

