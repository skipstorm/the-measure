import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Base path for the deployed site. Empty for local dev/preview; set to '/the-measure'
// by the GitHub Pages workflow (BASE_PATH env) so links resolve under the project subpath.
const base = process.env.BASE_PATH ?? '';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// KitConfig options are passed at the top level here (this project configures SvelteKit
			// inline via the Vite plugin instead of svelte.config.js).
			// Static build for GitHub Pages. `fallback` provides an SPA shell (named 404.html so
			// GitHub Pages serves it for any non-prerendered/deep-link path) that client-routes.
			adapter: adapter({ fallback: '404.html' }),
			paths: { base }
		})
	]
});
