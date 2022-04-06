const c = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/blog/motivational-interviewing.md"),
	() => import("../../src/routes/blog/web-development-resources.md"),
	() => import("../../src/routes/blog/future-proofing-research.md"),
	() => import("../../src/routes/blog/iterate-iterate-iterate.md"),
	() => import("../../src/routes/blog/lost-in-programming.md"),
	() => import("../../src/routes/blog/svelteKit-endpoints.md"),
	() => import("../../src/routes/blog/endnote-tutorial.md")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/blog/motivational-interviewing.md
	[/^\/blog\/motivational-interviewing\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/blog/web-development-resources.md
	[/^\/blog\/web-development-resources\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/blog/future-proofing-research.md
	[/^\/blog\/future-proofing-research\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/blog/iterate-iterate-iterate.md
	[/^\/blog\/iterate-iterate-iterate\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/blog/lost-in-programming.md
	[/^\/blog\/lost-in-programming\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/blog/svelteKit-endpoints.md
	[/^\/blog\/svelteKit-endpoints\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/blog/endnote-tutorial.md
	[/^\/blog\/endnote-tutorial\/?$/, [c[0], c[9]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];