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

<article class="relative max-w-[75ch] mx-auto px-6 md:px-8 prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-semibold prose-a:no-underline">
 
    <h1 class="text-3xl max-w-[50ch] mb-2 text-base">Top tracks</h1>
    <p class="mb-8">Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.</p>
    
    <div>
        {#each top_tracks.top_tracks as track, index}
            <div class="grid grid-cols-4 content-start">
                <div class="col-span-3">
                    <a class="font-semibold text-lg" href={track.external_urls.spotify} rel="noopener noreferrer" target="_blank">{index + 1}. {track.name}</a> 
                    <span>{track.artists[0].name}</span>
                </div>
                <img class="my-0 mb-4 mt-2 h-20 w-20" alt="{track.name}'s album cover" height={track.album.images[1].height} width={track.album.images[1].width} src={track.album.images[1].url}>
            </div>
            <hr class="mt-2 mb-8">
        {/each}
    </div>

</article>

