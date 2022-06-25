import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkFootnotes from 'remark-footnotes'

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [remarkFootnotes],
	rehypePlugins: [rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				// https://github.com/pngwn/MDsveX/issues/387
				
			}
		]
	],

	layout: {
		post: '/src/lib/layouts/post.svelte',
	},
});

export default config;
