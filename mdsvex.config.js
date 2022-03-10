import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [],

	layout: {
		post: '/src/lib/layouts/post.svelte',
		note: '/src/lib/layouts/note.svelte',
	},
});

export default config;
