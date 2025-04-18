<!-- Frame.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import sdk from '@farcaster/frame-sdk';
	import { isFrame, safeAreaInsets } from '$lib/stores/frameStore';
	import type { SafeAreaInsets } from '$lib/types/types';

	let isSDKLoaded = false;
	let isVisible = false;

	onMount(async () => {
		try {
			if (sdk && !isSDKLoaded) {
				isSDKLoaded = true;
				const frameContext = await sdk.context;
				await sdk.actions.ready();

				const isValidContext = !!(
					frameContext &&
					typeof frameContext === 'object' &&
					'client' in frameContext &&
					'user' in frameContext
				);

				isFrame.set(isValidContext);

				// Update safe area insets if available
				if (frameContext?.client?.safeAreaInsets) {
					safeAreaInsets.set(frameContext.client.safeAreaInsets);
				}
			} else {
				isFrame.set(false);
			}
		} catch {
			isFrame.set(false);
			console.error('Failed to initialize Frame SDK');
		} finally {
			isVisible = true;
		}
	});

	$: insetStyle = `
		--safe-area-inset-top: ${$safeAreaInsets.top}px;
		--safe-area-inset-bottom: ${$safeAreaInsets.bottom}px;
		--safe-area-inset-left: ${$safeAreaInsets.left}px;
		--safe-area-inset-right: ${$safeAreaInsets.right}px;
		opacity: ${isVisible ? 1 : 0};
	`;
</script>

<div class="frame-container" style={insetStyle}>
	<slot />
</div>

<style>
	.frame-container {
		position: relative;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		padding-top: var(--safe-area-inset-top, 0);
		padding-bottom: var(--safe-area-inset-bottom, 0);
		padding-left: var(--safe-area-inset-left, 0);
		padding-right: var(--safe-area-inset-right, 0);
		transition: opacity 0.2s ease;
	}

	/* Hide scrollbars on all elements while maintaining scroll functionality */
	:global(*) {
		scrollbar-width: none !important;
		-ms-overflow-style: none !important;
	}

	:global(*::-webkit-scrollbar) {
		display: none !important;
		width: 0 !important;
		height: 0 !important;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100dvh;
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	:global(main) {
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	:global(textarea) {
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
