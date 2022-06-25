<script context="module">
    export const load = async ({fetch}) => {
        const top_tracks = await fetch('../api/top_tracks.json').then(res => res.json())
        return {
            props: {top_tracks}
        }
    }
</script>

<script>
    export let top_tracks;
</script>

<article class="relative max-w-[75ch] mx-auto px-6 md:px-8 prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-semibold !prose-a:no-underline dark:text-white">
 
    <h1 class="text-3xl max-w-[50ch] mb-2 dark:text-white">Top tracks</h1>
    <p class="mb-8 dark:text-white">Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.</p>
    
    <div>
        {#each top_tracks.top_tracks as track, index}
            <div class="flex flex-row row-nowrap gap-4">
                <div class="flex flex-row row-nowrap gap-4 items-center">
                    <span class="text-base text-gray-500 dark:text-gray-400 w-4">{index + 1}</span>
                    <img class="my-0 mb-4 mt-2 h-14 w-14" alt="{track.name}'s album cover" height={track.album.images[1].height} width={track.album.images[1].width} src={track.album.images[1].url}>
                </div>
                <a class="flex flex-col flex-nowrap group no-underline" href={track.external_urls.spotify} rel="noopener noreferrer" target="_blank">
                    <span class=" text-black dark:text-white">{track.name}</span> 
                    <span class="!group-hover:no-underline text-gray-500 dark:text-gray-300">{track.artists[0].name}</span>
                </a>
            </div>
        {/each}
    </div>

</article>

