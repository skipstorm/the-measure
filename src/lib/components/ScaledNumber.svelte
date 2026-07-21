<script lang="ts">
	import { scaledParts } from '$lib/numeric-display';

	let {
		formatted,
		baseSize,
		showCursor = false
	}: { formatted: string; baseSize: string; showCursor?: boolean } = $props();

	let parts = $derived(scaledParts(formatted));
</script>

<span class="scaled-number">
	<span class="int" style="font-size:calc({parts.intScale} * {baseSize})">{parts.intPart}</span><span
		class="dec"
		style="font-size:calc({parts.decScale} * {baseSize})">{parts.decPart}</span
	>{#if showCursor}<span class="cursor">|</span>{/if}
</span>

<style>
	.scaled-number {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: baseline;
	}
	.int {
		overflow-wrap: anywhere;
		transition: font-size 0.15s ease;
	}
	.dec {
		transition: font-size 0.15s ease;
	}
	.cursor {
		display: inline-block;
		width: 3px;
		color: var(--red);
		animation: blink 1.05s step-end infinite;
		align-self: stretch;
	}
</style>
