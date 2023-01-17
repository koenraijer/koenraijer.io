---
title: Styling Obsidian's Frontmatter in Live Preview
subtitle: Using CSS to make Frontmatter look like normal text. 
date: "2023-01-17"
tags:
    - Computer Science
    - Note taking
category: tutorial
layout: post
toc: false
---

<script>
    import Image from '$lib/components/Image.svelte'
</script>

As I was tweaking with Obsidian's settings, I noticed the frontmatter could be styled quite nicely in Reading mode. The thing is, I seldom use Reading mode, so I started looking for ways to prettify it in Live Preview .

Because there is no single `div` to target, styling the frontmatter turned out harder than expected, and neither the Discord nor the forums provided satisfactory solutions (although some did point me in the right direction).

I set myself some goals:
- See metadata in live preview
- Have the same behaviour for custom CSS as for other content in Live Preview (i.e., revert the CSS when focussing on that line)
- Don't let the frontmatter show up at all when exporting to PDF (it is usually not relevant to people I send the PDF to).

## Result
<Image src="/blog/Obsidian_Frontmatter.png" alt="Before and after styling Obsidian's frontmatter with custom CSS" halfbleed/>

## Code
```css
/* Changes Frontmatter text styles to normal when not acitve */
.is-live-preview .cm-line:not(.cm-active) .cm-hmd-frontmatter {
  font-family: var(--font-text) !important;
  font-size: inherit !important;
  color: inherit;
}

/* Styles keys in frontmatter */
.is-live-preview .cm-line:not(.cm-active) > .cm-atom:first-child {
  text-transform: capitalize;
  padding: var(--tag-padding-y) 0;
  margin: 0 0.5em 0 0 !important;
  line-height: 2.15em;
  font-weight: var(--bold-weight);
  color: var(--bold-color);
}

/* Adds colon after keys */
.is-live-preview .cm-line:not(.cm-active) > .cm-atom::after {
  content: ":";
  position: absolute;
}

/* Hides interpunction and triple dashes */
.is-live-preview .cm-line:not(.cm-active) .cm-hmd-frontmatter:is(.cm-meta, .cm-def) {
    display: none;
}

/* Removes upper triple dash */
.is-live-preview :is(.cm-line):nth-child(1):not(.cm-active) {	
  height: 0 !important;
}

/* Styles values of key-value pairs */
.is-live-preview .cm-line:not(.cm-active) .cm-hmd-frontmatter:not(.cm-atom) {
  background-color: var(--tag-background);
  border: var(--tag-border-width) solid var(--tag-border-color);
  border-radius: var(--tag-radius);
  padding: var(--tag-padding-y) calc(var(--tag-padding-x) + 0.1em);
  margin: 0 0.25em 0 0 !important;
  line-height: 2.15em;
  text-transform: capitalize;
}
```