<script lang="ts">
	import { stringToHyphenish, hyphenishToString } from '$lib/utils/converter';
	import type { HyphenishForm } from '$lib/types/types';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { hasOutput, safeAreaInsets } from '$lib/stores/frameStore';

	let form: HyphenishForm = {
		input: '',
		output: ''
	};

	$: hasOutput.set(!!form.output);

	function encode(): void {
		form.output = stringToHyphenish(form.input);
	}

	function decode(): void {
		form.output = hyphenishToString(form.input);
	}

	$: mainStyle = `
		--content-inset-top: ${$safeAreaInsets.top}px;
		--content-inset-bottom: ${$safeAreaInsets.bottom}px;
		--content-inset-left: ${$safeAreaInsets.left}px;
		--content-inset-right: ${$safeAreaInsets.right}px;
	`;
</script>

<main style={mainStyle}>
	<h1>Hyphenish</h1>

	<section class="intro">
		<p>Turn text into hyphens and dashes instead of 1s and 0s.</p>
		<p>
			Short hyphens (-) are 1s, long dashes (—) are 0s. Each letter becomes a pattern of these
			marks.
		</p>
	</section>

	<form class="converter">
		<div class="input-group">
			<label for="inputText">Enter text to encode or hyphenish to decode:</label>
			<textarea id="inputText" rows="4" bind:value={form.input}></textarea>
		</div>

		<div class="button-group">
			<button type="button" on:click={encode}>Encode</button>
			<button type="button" on:click={decode}>Decode</button>
		</div>

		<div class="input-group output-group">
			<label for="outputText">Result:</label>
			<textarea id="outputText" rows="4" bind:value={form.output} readonly></textarea>

			{#if $hasOutput}
				<CopyButton text={form.output} />
			{/if}
		</div>
	</form>

	<section class="outro">
		<p>
			Inspired by <a
				href="https://warpcast.com/polluterofminds/0xa819b509"
				target="_blank"
				rel="noopener noreferrer">@polluterofminds</a
			>
			on Farcaster. Built by
			<a href="https://warpcast.com/iammatthias" target="_blank" rel="noopener noreferrer"
				>@iammatthias</a
			>.
		</p>
		<p>
			- — <a
				href="https://zora.co/coin/base:0xf86afc57f8f3a28f5d2882097265c97379476fe7?referrer=0x429f42fB5247e3a34D88D978b7491d4b2BEe6105"
				>0xf86afc57f8f3a28f5d2882097265c97379476fe7</a
			>
		</p>
	</section>
</main>

<style>
	main {
		min-height: 100dvh;
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
		padding: var(--space-lg) var(--space-md);
		padding-top: calc(var(--space-lg) + var(--content-inset-top, 0));
		padding-bottom: calc(var(--space-lg) + var(--content-inset-bottom, 0));
		padding-left: calc(var(--space-md) + var(--content-inset-left, 0));
		padding-right: calc(var(--space-md) + var(--content-inset-right, 0));
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 400;
		letter-spacing: -0.03em;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.outro {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: auto;
		font-size: 0.875rem;
		padding-bottom: var(--content-inset-bottom, 0);
	}

	.converter {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		flex: 1;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.output-group {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.button-group {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	button {
		background-color: coral;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 1rem;
		border: none;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	button:hover {
		opacity: 0.9;
	}

	@media (max-width: 480px) {
		main {
			min-height: 100dvh;
			padding: var(--space-md);
			padding-top: calc(var(--space-md) + var(--content-inset-top, 0));
			padding-bottom: calc(var(--space-md) + var(--content-inset-bottom, 0));
			padding-left: calc(var(--space-md) + var(--content-inset-left, 0));
			padding-right: calc(var(--space-md) + var(--content-inset-right, 0));
		}

		h1 {
			font-size: 2rem;
		}

		.button-group {
			flex-direction: column;
		}

		button {
			width: 100%;
		}

		textarea {
			min-height: 100px;
		}
	}
</style>
