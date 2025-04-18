import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@farcaster/frame-sdk']
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/]
		}
	},
	ssr: {
		noExternal: ['@farcaster/frame-sdk']
	},
	server: {
		allowedHosts: ['infinite-gnu-definitely.ngrok-free.app']
	}
});
