<script>
    import {onMount} from 'svelte';
    import {slide} from 'svelte/transition'
    let song;

    async function getNowPlaying() {
        song = await fetch('https://www.koenraijer.io/api/now_playing.json').then(res => res.json())
    }

    onMount(async () => {
            getNowPlaying();
    })

    
    setInterval(() => {
        getNowPlaying();
    }, 5000);
    

    /*
    $: request_timer = song.duration_ms - song.progress_ms // See what's left of a song before making another API call. 

    $: console.log(request_timer)
    $: setTimeout(() => {getNowPlaying(), request_timer})
    */
    /* 
    - If a song is playing, I want it to switch to stop playing when I stop playing without reloading the page.
    - The response contains information on a) how far in the song I am, b) how much is still left. This allows me to determine when to make another request.
    - The new request will say I stopped playing, or another song has started playing. If another song has started playing, I can repeat the same thing.
    */
</script>

    <div class="group inline-flex px-3 py-1 rounded-md items-center bg-gray-100 transition-colors decoration-none dark:bg-gray-50/10 text-sm {song ? "hover:bg-[#1DB954] dark:hover:bg-[#1DB954]" : ""}">
        {#if !song}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><path d="M179.1,116.3a112.1,112.1,0,0,0-102.3.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><path d="M158.7,155.3A68.4,68.4,0,0,0,128,148a67.6,67.6,0,0,0-30.8,7.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
        &nbsp;Loading - <span class="text-gray-400">&nbsp;Spotify</span>        
        {:else if song}
            {#if song.isPlaying === true}
                <div class="audio inline-flex h-4 w-4 relative transform -translate-y-1">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                &nbsp;<a href={song.songUrl} rel="noopener noreferrer" target="_blank" title="{song.artist}" class="hover:underline font-[500]">{song.title}</a>
            {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><path d="M179.1,116.3a112.1,112.1,0,0,0-102.3.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><path d="M158.7,155.3A68.4,68.4,0,0,0,128,148a67.6,67.6,0,0,0-30.8,7.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
            &nbsp;Not playing - <span class="text-gray-400">&nbsp;Spotify</span>   
            {/if}
        {/if}
        <br>
    </div>

<style>
        .audio span {
        width: 3px;
        height: 100%;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        @apply bg-slate-700 dark:bg-white;
    }
    
    .audio span:first-of-type {
        margin-top: 0;
    }
        
    .audio span:nth-child(1) {
        animation: animationTest 1.5s infinite ease-in-out;
        left: 0;
        }
        
        .audio span:nth-child(2) {
        animation: animationTest 1.75s infinite ease-in-out;
        left: 5px;
        }
        
        .audio span:nth-child(3) {
        animation: animationTest 2s infinite ease-in-out;
        left: 10px;
        }
  
    @keyframes animationTest {
        0%   { height: 2px; }
        50% { height: 12px; }
        100% { height: 2px; }
    }

    @keyframes heightIncrease {
        0% { height: 3rem}
        100% { height: 100% }
    }
  </style>
  