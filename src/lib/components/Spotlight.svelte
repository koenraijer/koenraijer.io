<script>
    export let spotlight

     // Spotlight effect (https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/) 
    let m = { x: 0, y: 0 };
        let cx;
    let cy;
    let svg;
    let div;
    let spotlightVisible = false;

        function handleMousemove(event) {
        // Get mouse coordinates
            m.x = event.clientX;
            m.y = event.clientY;

        // Translate to SVG coordinates
        const pt = svg.createSVGPoint();
        pt.x = m.x
        pt.y = m.y

        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())

        cx = svgP.x
        cy = svgP.y
        }
</script>
<section class="">
    <div on:mousemove={handleMousemove} bind:this={div} on:focus={() => spotlightVisible = true} on:mouseover={() => spotlightVisible = true} on:mouseout={() => spotlightVisible = false} on:blur={() => spotlightVisible = false} class="grid grid-cols-1 relative gap-4 mb-12 md:mb-16 overflow-hidden">
            <a class="group rounded-lg w-full bg-gradient-to-r sm:p-3 p-2 from-primary-content to-primary-content overflow-hidden grid items-stretch" href="{spotlight.path}" sveltekit:prefetch>
                <div class="bg-base-100 rounded-md p-4 flex flex-col flex-nowrap justify-between h-full">
                  <div class="p-4">
                    <h2 class="text-lg group-hover:underline font-semibold pb-2 md:pb-4">{spotlight.meta.title}</h2>
                    <p class="text-base pb-4 md:pb-6">{spotlight.meta.subtitle}</p>
                    <span class="text-sm text-neutral-content justify-end">{new Date(spotlight.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
            </a>

            <svg bind:this={svg} class="absolute pointer-events-none" width="150%" height="150%" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="grad" fx="0.5" fy="0.5" r="1" >
                  <stop stop-opacity="1" style="stop-color:#ffffff80" offset="0"/>
                  <stop stop-opacity="0" style="stop-color:#ffffff80" offset="0.3"/>
                </radialGradient>
              </defs>
              <circle r="75px" fill="url(#grad)" class="{spotlightVisible ? "opacity-1" : "opacity-0"} transition-opacity" {cx} {cy}></circle>
            </svg>
    </div>
  </section>