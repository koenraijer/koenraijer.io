<script>
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    export let allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    export let activeHeading = null
    let scrollY
    let headings = []
    function updateHeadings() {
      const nodes = [
        // Exclude h1 as those should be reserved for the post title
        ...document.querySelectorAll(`article :where(${allowedHeadings.join(', ')}):not(#__sections)`)
      ]
      const depths = nodes.map((node) => Number(node.nodeName[1]))
      const minDepth = Math.min(...depths)
      headings = nodes.map((node, idx) => ({
        title: node.innerText,
        depth: depths[idx] - minDepth,
        node
      }))
      // set first heading as active if null on page load
      if (activeHeading === null) {
        activeHeading = headings[0]
      }
    }
    onMount(() => {
      updateHeadings()
      setActiveHeading()
    })
    if (typeof window !== 'undefined') {
      page.subscribe(() => {
        updateHeadings()
        setActiveHeading()
      })
    }
    function setActiveHeading() {
      scrollY = window.scrollY
      const visibleIndex =
        headings.findIndex(
          (heading) => heading.node.offsetTop + heading.node.clientHeight > scrollY
        ) - 1
      activeHeading = headings[visibleIndex]
      const pageHeight = document.body.scrollHeight
      const scrollProgress = (scrollY + window.innerHeight) / pageHeight
      if (scrollProgress > 0.95) {
        activeHeading = headings[headings.length - 1]
      }
    }
  </script>
  
  <svelte:window on:scroll={setActiveHeading} />
  
  <nav tabindex="0" class="collapse collapse-arrow bg-gray-100 border-2 rounded-md mb-8 md:mb-12 not-prose px-6 py-2 min-w-[50%]">
    <input type="checkbox" class="m-0 p-0 min-h-fit"> 

    <div id="__sections" class="collapse-title text-base text-base-content font-[500] p-0 m-0">
        Table of Contents
    </div>
      
    <ul class="!pl-0 translate-y-2 collapse-content">
    {#each headings as heading}
        <li
        class="heading list-none my-1 text-sm font-normal transition-all"
        class:active={activeHeading?.node === heading.node}
        style={`--depth: ${heading.depth}`}
        >
        <a class="!no-underline" href={`#${heading.node.id}`}>{heading.title}</a>
        </li>
    {/each}
    </ul>
  </nav>

  <style>
      /*
      .active {
          @apply text-base-content font-semibold;
      }
      */

      .heading {
            margin-left: calc(var(--depth, 0) * 0.75rem);
        }
  </style>