<script lang="ts">
	import { isFrame } from '$lib/stores/frameStore';
	import { sdk } from '@farcaster/frame-sdk';

	export let text: string;
	let copyButtonText = 'Copy';

	async function copyToClipboard(): Promise<void> {
		try {
			await navigator.clipboard.writeText(text);
			copyButtonText = 'Copied!';
			setTimeout(() => (copyButtonText = 'Copy'), 2000);
		} catch (err) {
			console.error('Failed to copy text:', err);
			copyButtonText = 'Error';
			setTimeout(() => (copyButtonText = 'Copy'), 2000);
		}
	}

	async function shareOrCast(): Promise<void> {
		const shareText = `${text}\n\n:: hyphenish.com`;
		const currentUrl = window.location.href;

		if ($isFrame) {
			try {
				await sdk.actions.composeCast({
					text: shareText,
					embeds: currentUrl ? [currentUrl] : undefined
				});
			} catch (error) {
				console.error('Failed to compose cast via SDK:', error);
			}
		} else {
			const encodedText = encodeURIComponent(shareText);
			const warpcastUrl = `https://warpcast.com/~/compose?text=${encodedText}`;
			try {
				window.open(warpcastUrl, '_blank');
			} catch (error) {
				console.error('Failed to open Warpcast compose URL:', error);
			}
		}
	}
</script>

<div class="button-group">
	<button type="button" class="action-button copy" on:click={copyToClipboard}>
		{copyButtonText}
	</button>
	<button type="button" class="action-button share-cast" on:click={shareOrCast}>
		{$isFrame ? 'Cast' : 'Share'}
	</button>
</div>

<style>
	.button-group {
		display: inline-flex;
		gap: 0.5rem;
	}

	.action-button {
		background-color: var(--color-action);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		font-size: 0.875rem;
		border: none;
		cursor: pointer;
		transition:
			opacity 0.2s ease,
			background-color 0.2s ease;
		white-space: nowrap;
	}

	.action-button:hover {
		opacity: 0.9;
	}

	.share-cast {
		background-color: #855dcd;
	}
</style>
