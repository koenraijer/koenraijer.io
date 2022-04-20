<script>
    export let href;
    export let no_target = false;
</script>

<a class="text-primary hover:underline font-normal" href={href} target="{no_target ? "_self" : "_blank"}" rel="nofollow noopener noreferrer"><slot></slot></a>