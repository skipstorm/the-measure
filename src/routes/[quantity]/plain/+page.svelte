<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { UNITS, fromBase } from '$lib/data';
	import { fmt } from '$lib/format';
	import { readabilityScore } from '$lib/numeric-display';
	import { applyKey } from '$lib/keypad-logic';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import UnitIcon from '$lib/components/UnitIcon.svelte';
	import Keypad from '$lib/components/Keypad.svelte';
	import ScaledNumber from '$lib/components/ScaledNumber.svelte';

	const PROP_BASE_SIZE = '4.5rem';
	const VALUE_BASE_SIZE = 'clamp(2.375rem, 8vw, 3.75rem)';

	let { data } = $props();
	let q = $derived(data.quantity);

	let value = $state('');
	let expanded = $state(false);

	let plainBase = $derived(parseFloat(value || '0') || 0);

	let proposals = $derived(
		UNITS[q.id]
			.filter((u) => u.cat === 'practical')
			.map((u) => {
				const count = fromBase(plainBase, u);
				const cs = fmt(count);
				return {
					unitName: u.name,
					icon: u.icon,
					formatted: cs,
					label: cs === '1' ? u.name : u.plural,
					note: u.note,
					score: readabilityScore(count, cs)
				};
			})
			// Nicest (most graspable) numbers first: whole/simple values near 1 win over huge or messy ones.
			.sort((a, b) => (a.score - b.score) || 0)
	);

	let proposalsShown = $derived(expanded ? proposals : proposals.slice(0, 2));
	let hasMore = $derived(proposals.length > 2);
	let scrollable = $derived(expanded && proposals.length > 8);

	function onKey(k: string) {
		value = applyKey(value, k);
	}

	function goDirect(unitName: string) {
		const params = new URLSearchParams({ to: unitName, value });
		goto(`${base}/${q.id}/convert?${params.toString()}`);
	}
</script>

<svelte:head>
	<title>In Plain Terms — {q.name} — The Measure</title>
</svelte:head>

<PageHeader backLabel={q.name} backHref="{base}/{q.id}" rightText="In Plain Terms" />

<div class="page">
	<div class="eyebrow"><span>Section I — {q.name}</span></div>
	<h2 class="title">In Plain Terms</h2>
	<p class="subtitle">A quantity of {q.basePlural}, rendered in the everyday.</p>

	<div class="value-box">
		<div class="value-label">Value in {q.basePlural}</div>
		<div class="value-display"><ScaledNumber formatted={value} baseSize={VALUE_BASE_SIZE} showCursor /></div>
	</div>

	<div class="proposals-wrap">
		<div class="proposals-label">Rendered Equivalently</div>
		<div class="proposals-scroll" class:scrollable>
			<div class="proposals-grid">
				{#each proposalsShown as p (p.unitName)}
					<div class="prop-card">
						<div class="watermark"><UnitIcon icon={p.icon} size={180} /></div>
						<div class="prop-content">
							<button type="button" class="go-direct" title="Convert directly" onclick={() => goDirect(p.unitName)}>
								<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="7,4 11,8 7,12" />
									<line x1="11" y1="8" x2="3" y2="8" />
									<polyline points="17,20 13,16 17,12" />
									<line x1="13" y1="16" x2="21" y2="16" />
								</svg>
							</button>
							<div class="prop-count"><ScaledNumber formatted={p.formatted} baseSize={PROP_BASE_SIZE} /></div>
							<div class="prop-unit">{p.label}</div>
							{#if p.note}
								<div class="prop-note">{p.note}</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
		{#if hasMore}
			<div class="more-row">
				<button type="button" class="more-btn" onclick={() => (expanded = !expanded)}>
					{expanded ? 'Fewer' : 'More'} <span class="chevron">{expanded ? '▲' : '▼'}</span>
				</button>
			</div>
		{/if}
	</div>

	<div class="keypad-wrap">
		<div class="clear-row">
			<button type="button" class="clear-link" onclick={() => onKey('clear')}>Clear</button>
		</div>
		<Keypad {onKey} />
	</div>
</div>

<style>
	.page {
		animation: pageIn 0.4s ease;
		max-width: 820px;
		margin: 0 auto;
		padding: 30px 24px 64px;
	}
	.eyebrow {
		text-align: center;
	}
	.eyebrow span {
		font-size: 11px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--red);
	}
	.title {
		font-family: 'Libre Baskerville';
		font-weight: 900;
		font-size: clamp(34px, 6vw, 54px);
		text-align: center;
		margin: 6px 0 8px;
	}
	.subtitle {
		text-align: center;
		font-style: italic;
		color: var(--gray-2);
		margin: 0 0 24px;
	}
	.value-box {
		max-width: 520px;
		margin: 0 auto 30px;
		border: 1px solid var(--ink);
		background: var(--paper-1);
		padding: 22px 26px;
		text-align: center;
	}
	.value-label {
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gray-1);
	}
	.value-display {
		font-family: 'Libre Baskerville';
		font-weight: 700;
		line-height: 1.1;
	}
	.proposals-wrap {
		max-width: 720px;
		margin: 0 auto;
	}
	.proposals-label {
		text-align: center;
		border-top: 2px solid var(--ink);
		padding-top: 8px;
		margin-bottom: 12px;
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--red);
	}
	.proposals-scroll.scrollable {
		max-height: 560px;
		overflow-y: auto;
		padding-right: 4px;
	}
	.proposals-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}
	/* Below 700px each card takes the full width (single column); 700px+ keeps two columns. */
	@media (max-width: 699.98px) {
		.proposals-grid {
			grid-template-columns: 1fr;
		}
	}
	.prop-card {
		position: relative;
		overflow: hidden;
		background: var(--paper-2);
		border: 1px solid var(--ink);
		box-shadow: 3px 3px 0 rgba(27, 23, 18, 0.12);
		padding: 22px 20px 20px;
		box-sizing: border-box;
		animation: tick 0.3s ease;
	}
	.watermark {
		position: absolute;
		right: -22px;
		bottom: -22px;
		width: 180px;
		height: 180px;
		color: rgba(27, 23, 18, 0.13);
		pointer-events: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.prop-content {
		position: relative;
	}
	.go-direct {
		position: absolute;
		top: 0;
		right: 0;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: none;
		border: 1px solid var(--ink);
		cursor: pointer;
		color: var(--ink);
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 0;
	}
	.go-direct:hover {
		background: var(--ink);
		color: var(--paper-1);
	}
	.prop-count {
		font-family: 'Libre Baskerville';
		font-weight: 900;
		line-height: 0.85;
		color: var(--red);
	}
	.prop-unit {
		font-family: 'Libre Baskerville';
		font-weight: 700;
		font-size: 24px;
		margin-top: 6px;
	}
	.prop-note {
		font-size: 13px;
		color: var(--gray-1);
		font-style: italic;
		text-wrap: pretty;
		margin-top: 6px;
		max-width: 180px;
	}
	.more-row {
		text-align: center;
		margin-top: 14px;
	}
	.more-btn {
		background: none;
		border: 1px solid var(--ink);
		border-radius: 20px;
		padding: 7px 20px;
		cursor: pointer;
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink);
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.more-btn:hover {
		background: #efe9db;
	}
	.chevron {
		font-size: 14px;
	}
	.keypad-wrap {
		max-width: 420px;
		margin: 34px auto 0;
	}
	.clear-row {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 8px;
	}
	.clear-link {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--red);
		font-family: inherit;
	}
</style>
