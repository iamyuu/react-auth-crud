import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config
export default defineConfig({
	resolve: {
		alias: {
			'~': resolve('src'),
		},
	},

	plugins: [
		// https://github.com/vitejs/vite/tree/main/packages/plugin-react
		react({
			// https://github.com/vitejs/vite/issues/3301#issuecomment-1080292430
			fastRefresh: false,
		}),
	],

	// https://vitest.dev/config
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./src/tests/setup.ts'],
	},
});
