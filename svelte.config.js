import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		})
	}
};