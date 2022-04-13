<script>
    function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } 
</script>
<footer class="grid place-items-center">
    <button on:click={topFunction} class="text-gray-400 mx-auto max-w-[80ch] w-fit mb-4">Take me to the top ⏫</button>
</footer>