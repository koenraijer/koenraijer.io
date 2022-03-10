<script>
    export let url;
    export let name;
</script>

  <blockquote class="relative p-4 text-lg border-l-0">
    <p class="mb-4 font-[300]"><slot></slot></p>
    <cite class="flex justify-end">
        <span class="mb-1 text-base not-italic">
            <strong>Source: </strong>
            <a href="{url}" target="_blank" class="" rel="noopener noreferrer">{name}</a></span>  
    </cite>
  </blockquote>
