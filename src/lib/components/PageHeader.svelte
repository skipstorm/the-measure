<script lang="ts">
	let {
		backLabel,
		rightText = '',
		backHref,
		onBack
	}: {
		backLabel: string;
		rightText?: string;
		backHref?: string;
		onBack?: () => void;
	} = $props();
</script>

<div class="bar">
	<div class="inner">
		{#if backHref}
			<a href={backHref} class="back">‹ {backLabel}</a>
		{:else}
			<button type="button" class="back back-button" onclick={onBack}>‹ {backLabel}</button>
		{/if}
		<span class="title">The Measure</span>
		<span class="right">{rightText}</span>
	</div>
</div>

<style>
	.bar {
		border-bottom: 1px solid var(--ink);
		background: var(--paper-0);
		position: sticky;
		top: 0;
		z-index: 5;
	}
	.inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 12px 22px;
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.back {
		flex: 1 1 0;
		min-width: 0;
		cursor: pointer;
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--red);
		white-space: nowrap;
		text-align: left;
	}
	.back-button {
		background: none;
		border: none;
		padding: 0;
		font-family: inherit;
	}
	.title {
		flex: none;
		font-family: 'Libre Baskerville';
		font-weight: 900;
		font-size: 18px;
		text-align: center;
	}
	.right {
		flex: 1 1 0;
		min-width: 0;
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--gray-1);
		white-space: nowrap;
		text-align: right;
	}
</style>
