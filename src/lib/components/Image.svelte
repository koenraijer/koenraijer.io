<script>
    export let fullbleed = false;
    export let halfbleed = false;
    export let alt;
    export let src;

    let base64pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEElEQVR42mNkIAAYRxWAAQAG9gAKqv6+AwAAAABJRU5ErkJggg=="

    function useLazyImage(
        node,
        { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0 } = {},
        ) {
            if (window && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const image = entry.target;

                                if (image.dataset.src) {
                                    image.src = image.dataset.src;
                                }

                                if (image.dataset.srcset) {
                                    image.srcset = image.dataset.srcset;
                                }

                                observer.unobserve(image);
                            }
                        });
                    },
                    {
                        root,
                        rootMargin,
                        threshold,
                    },
                );
                observer.observe(node);

                return {
                    destroy() {
                        if (observer) {
                            observer.unobserve(node);
                        }
                    },
                };
            }
    }

    // Src: https://github.com/alexstaroselsky/svelte-lazy-image

</script>

<div class="{fullbleed ? "md:h-[70vh]" : " "} mx-auto relative">
    <img 
        class="mx-auto {fullbleed ? "full-bleed" : " "}{halfbleed ? "half-bleed" : " "}"   
        {alt}
        data-src="{src}"
        src="{base64pixel}"
        use:useLazyImage={{ threshold: 0.5}} 
        decoding="async" 
        loading="lazy"
    />
</div>

<style>
    .full-bleed {
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        max-width: 100vw;
        width: 100vw;
        max-height: 100%;
        object-fit: cover;
    }

    .half-bleed {
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        max-width: 100vw;
        width: 100vw;
        max-height: 100%;
        object-fit: contain;
    }
</style>
