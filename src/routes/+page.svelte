<script lang="ts">
	import { base } from '$app/paths';
	import { QUANTITIES } from '$lib/data';
	import QuantityIcon from '$lib/components/QuantityIcon.svelte';

	let layout = $state<'grid' | 'index'>('grid');

	const now = new Date();
	const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
	const fullDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
</script>

<svelte:head>
	<title>The Measure</title>
</svelte:head>

<div class="page">
	<div class="masthead">
		<span>Vol. I — No. 1</span>
		<span>{fullDate}</span>
		<span>{weekday} Edition</span>
	</div>
	<h1 class="title">The Measure</h1>
	<div class="tagline">All quantities, faithfully rendered — however preposterous the ruler.</div>
	<div class="rule"></div>

	<div class="toggle-row">
		<button type="button" class="layout-toggle" onclick={() => (layout = layout === 'grid' ? 'index' : 'grid')}>
			{layout === 'grid' ? 'View as Index ▾' : 'View as Tiles ▾'}
		</button>
	</div>

	{#if layout === 'grid'}
		<div class="grid">
			{#each QUANTITIES as q (q.id)}
				{#if q.active}
					<a class="tile" href="{base}/{q.id}">
						<div class="tile-icon"><QuantityIcon id={q.id} size={30} /></div>
						<div class="tile-name">{q.name}</div>
						<div class="tile-base">Measured in {q.base}</div>
					</a>
				{:else}
					<div class="tile inactive">
						<div class="tile-icon"><QuantityIcon id={q.id} size={30} /></div>
						<div class="tile-name">{q.name}</div>
						<div class="tile-base">Measured in {q.base}</div>
						<div class="tile-overlay">
							<span class="tile-overlay-text">In a Future Edition</span>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{:else}
		<div class="grid list-grid">
			{#each QUANTITIES as q, i (q.id)}
				{#if q.active}
					<a class="list-card" href="{base}/{q.id}">
						<span class="list-num">{String(i + 1).padStart(2, '0')}</span>
						<div class="list-icon"><QuantityIcon id={q.id} size={22} /></div>
						<div class="list-mid">
							<div class="list-name">{q.name}</div>
							<div class="list-base">Measured in {q.base}</div>
						</div>
						<span class="list-status">Read →</span>
					</a>
				{:else}
					<div class="list-card inactive">
						<span class="list-num">{String(i + 1).padStart(2, '0')}</span>
						<div class="list-icon"><QuantityIcon id={q.id} size={22} /></div>
						<div class="list-mid">
							<div class="list-name">{q.name}</div>
							<div class="list-base">Measured in {q.base}</div>
						</div>
						<span class="list-status">Forthcoming</span>
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	<div class="footer">Bureau of Weights &amp; Whimsy</div>
</div>

<style>
	.page {
		animation: pageIn 0.45s ease;
		max-width: 1120px;
		margin: 0 auto;
		padding: 34px 24px 72px;
	}
	.masthead {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--gray-1);
		border-bottom: 1px solid rgba(27, 23, 18, 0.25);
		padding-bottom: 9px;
	}
	.title {
		font-family: 'Libre Baskerville', serif;
		font-weight: 900;
		font-size: clamp(46px, 9vw, 104px);
		line-height: 0.94;
		text-align: center;
		margin: 20px 0 8px;
		letter-spacing: -0.015em;
	}
	.tagline {
		text-align: center;
		font-style: italic;
		color: var(--gray-2);
		font-size: clamp(14px, 2vw, 19px);
		max-width: 640px;
		margin: 0 auto;
	}
	.rule {
		border-top: 3px solid var(--ink);
		border-bottom: 1px solid var(--ink);
		height: 5px;
		margin: 18px 0 0;
	}
	.toggle-row {
		display: flex;
		justify-content: center;
		margin: 24px 0;
	}
	.layout-toggle {
		background: none;
		border: 1px solid rgba(27, 23, 18, 0.3);
		border-radius: 20px;
		padding: 5px 14px;
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--gray-2);
		cursor: pointer;
	}
	.layout-toggle:hover {
		background: #efe9db;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border: 1px solid rgba(27, 23, 18, 0.28);
	}
	.tile {
		position: relative;
		cursor: pointer;
		padding: 28px 20px 26px;
		border: 1px solid rgba(27, 23, 18, 0.16);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 11px;
		background: var(--paper-1);
		transition: background 0.2s;
		color: inherit;
	}
	.tile:hover {
		background: #efe9db;
	}
	.tile-icon {
		width: 60px;
		height: 60px;
		border: 1.5px solid var(--ink);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tile-name {
		font-family: 'Libre Baskerville';
		font-weight: 700;
		font-size: 20px;
		line-height: 1.12;
	}
	.tile-base {
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--gray-1);
	}
	.tile.inactive {
		cursor: default;
	}
	.tile-overlay {
		position: absolute;
		inset: 0;
		background: rgba(244, 241, 232, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12px;
	}
	.tile-overlay-text {
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--red);
		border-top: 1px solid var(--red);
		border-bottom: 1px solid var(--red);
		padding: 6px 0;
	}

	.list-grid {
		border: none;
	}
	.list-card {
		display: flex;
		align-items: baseline;
		gap: 14px;
		padding: 19px 16px;
		border: 1px solid rgba(27, 23, 18, 0.16);
		cursor: pointer;
		transition: background 0.18s;
		color: inherit;
	}
	.list-card:hover {
		background: #efe9db;
	}
	.list-card.inactive {
		cursor: default;
	}
	.list-num {
		font-family: 'Libre Baskerville';
		font-weight: 900;
		font-size: 22px;
		color: var(--red);
		min-width: 30px;
	}
	.list-icon {
		width: 42px;
		height: 42px;
		border: 1.25px solid var(--ink);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: none;
	}
	.list-mid {
		flex: 1;
		min-width: 0;
	}
	.list-name {
		font-family: 'Libre Baskerville';
		font-weight: 700;
		font-size: 24px;
	}
	.list-base {
		font-size: 12px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--gray-1);
	}
	.list-status {
		font-size: 12px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--red);
		white-space: nowrap;
	}

	.footer {
		text-align: center;
		margin-top: 44px;
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--gray-3);
	}
</style>
