<script context="module">
    export const load = async ({fetch}) => {
        const top_tracks = await fetch('./api/top_tracks.json').then(res => res.json())
        return {
            props: {top_tracks}
        }
    }
</script>

<script>
    export let top_tracks;
</script>

<article class="relative text-base max-w-[60ch] mx-auto px-4 md:px-8 prose prose-p:text-base-content prose-ul:text-base-content prose-li:text-base-content prose-headings:font-semibold prose-a:no-underline">
 
    <h1 class="text-3xl max-w-[50ch] mb-2 text-base">Top tracks</h1>
    <p class="mb-8">Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.</p>
    <ol class="list-decimal !pl-0 mx-auto">
    {#each top_tracks.top_tracks as track, index}
        <li class="flex flex-col flex-nowrap justify-start !my-0">
            <a class="font-semibold text-lg" href={track.external_urls.spotify} rel="noopener noreferrer" target="_blank">{index + 1}. {track.name}</a> 
            <span>{track.artists[0].name}</span>
            <hr class="mt-2 mb-8">
        </li>

    {/each}
    </ol>

</article>

