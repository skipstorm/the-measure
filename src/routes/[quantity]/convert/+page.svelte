<script lang="ts">
	import { base } from '$app/paths';
	import { UNITS, CATEGORY_LABELS, unitByName, toBase, fromBase, type Category } from '$lib/data';
	import { fmt } from '$lib/format';
	import { applyKey } from '$lib/keypad-logic';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import UnitIcon from '$lib/components/UnitIcon.svelte';
	import Keypad from '$lib/components/Keypad.svelte';
	import ScaledNumber from '$lib/components/ScaledNumber.svelte';

	const FROM_BASE_SIZE = 'clamp(2.625rem, 10vw, 4.125rem)';
	const TO_BASE_SIZE = 'clamp(1.8125rem, 7vw, 4.125rem)';

	let { data } = $props();
	let q = $derived(data.quantity);

	let fromUnit = $state(data.initialFrom);
	let toUnit = $state(data.initialTo);
	let convValue = $state(data.initialValue);

	let pickerOpen = $state(false);
	let pickerSide = $state<'from' | 'to'>('from');

	let from = $derived(unitByName(q.id, fromUnit) ?? UNITS[q.id][0]);
	let to = $derived(unitByName(q.id, toUnit) ?? UNITS[q.id][1]);
	let num = $derived(parseFloat(convValue || '0') || 0);
	let result = $derived(fromBase(toBase(num, from), to));
	let resultFmt = $derived(fmt(result));
	let per = $derived(fromBase(toBase(1, from), to));
	let rateLine = $derived('1 ' + from.name + ' = ' + fmt(per) + ' ' + (fmt(per) === '1' ? to.name : to.plural));

	let pickerGroups = $derived(
		(['si', 'customary', 'practical'] as Category[]).map((cat) => ({
			title: CATEGORY_LABELS[cat],
			units: UNITS[q.id].filter((u) => u.cat === cat)
		}))
	);

	function onKey(k: string) {
		convValue = applyKey(convValue, k);
	}

	function swap() {
		[fromUnit, toUnit] = [toUnit, fromUnit];
	}

	function openPicker(side: 'from' | 'to') {
		pickerSide = side;
		pickerOpen = true;
	}

	function chooseUnit(name: string) {
		if (pickerSide === 'from') fromUnit = name;
		else toUnit = name;
		pickerOpen = false;
	}
</script>

<svelte:head>
	<title>Direct Conversion — {q.name} — The Measure</title>
</svelte:head>

{#if pickerOpen}
	<PageHeader backLabel="Converter" rightText="Select Unit" onBack={() => (pickerOpen = false)} />

	<div class="page">
		<h2 class="title">Select a Unit</h2>
		<p class="subtitle">{pickerSide === 'from' ? 'Converting from this unit.' : 'Converting into this unit.'}</p>
		{#each pickerGroups as group (group.title)}
			<div class="group">
				<div class="group-title">{group.title}</div>
				{#each group.units as u (u.name)}
					<button type="button" class="unit-row" onclick={() => chooseUnit(u.name)}>
						<div class="unit-left">
							<div class="unit-icon"><UnitIcon icon={u.icon} size={24} /></div>
							<span class="unit-name">{u.name}</span>
						</div>
						<span class="unit-rate">1 = {fmt(toBase(1, u))} {q.basePlural}</span>
					</button>
				{/each}
			</div>
		{/each}
	</div>
{:else}
	<PageHeader backLabel={q.name} backHref="{base}/{q.id}" rightText="Direct Conversion" />

	<div class="page">
		<div class="switcher">
			<button type="button" class="unit-link" onclick={() => openPicker('from')}>{from.name}</button>
			<button type="button" class="swap" onclick={swap} aria-label="Swap units">⇄</button>
			<button type="button" class="unit-link" onclick={() => openPicker('to')}>{to.name}</button>
		</div>

		<div class="from-display">
			<div class="from-label">{from.name}</div>
			<div class="from-value"><ScaledNumber formatted={convValue} baseSize={FROM_BASE_SIZE} showCursor /></div>
		</div>
		<div class="to-display">
			<div class="to-label">Equals, in {to.name}</div>
			<div class="to-value"><ScaledNumber formatted={resultFmt} baseSize={TO_BASE_SIZE} /></div>
			<div class="rate-line">{rateLine}</div>
			{#if to.note}
				<div class="to-note">{to.note}</div>
			{/if}
		</div>

		<div class="keypad-wrap">
			<div class="clear-row">
				<button type="button" class="clear-link" onclick={() => onKey('clear')}>Clear</button>
			</div>
			<Keypad {onKey} />
		</div>
	</div>
{/if}

<style>
	.page {
		animation: pageIn 0.4s ease;
		max-width: 600px;
		margin: 0 auto;
		padding: 26px 20px 60px;
	}
	.switcher {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		border-bottom: 1px solid rgba(27, 23, 18, 0.32);
		padding: 12px 2px 16px;
	}
	.unit-link {
		flex: 1;
		text-align: center;
		font-family: 'Libre Baskerville';
		font-weight: 700;
		font-size: 22px;
		color: var(--red);
		cursor: pointer;
		background: none;
		border: none;
		font-family: inherit;
	}
	.swap {
		background: none;
		border: 1px solid var(--ink);
		border-radius: 50%;
		width: 44px;
		height: 44px;
		font-size: 19px;
		cursor: pointer;
		color: var(--ink);
		flex: none;
		transition: background 0.18s;
	}
	.swap:hover {
		background: #efe9db;
	}
	.from-display {
		text-align: center;
		padding: 30px 0 10px;
	}
	.from-label {
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--gray-1);
	}
	.from-value {
		font-family: 'Libre Baskerville';
		font-weight: 700;
		line-height: 1;
	}
	.to-display {
		text-align: center;
		border-top: 1px solid rgba(27, 23, 18, 0.22);
		padding: 22px 0 4px;
	}
	.to-label {
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--red);
	}
	.to-value {
		font-family: 'Libre Baskerville';
		font-weight: 900;
		line-height: 1.05;
	}
	.rate-line {
		font-size: 13px;
		font-style: italic;
		color: var(--gray-1);
		margin-top: 10px;
	}
	.to-note {
		font-size: 13px;
		color: var(--gray-4);
		margin-top: 2px;
		text-wrap: pretty;
	}
	.keypad-wrap {
		max-width: 420px;
		margin: 28px auto 0;
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

	.title {
		font-family: 'Libre Baskerville';
		font-weight: 900;
		font-size: clamp(28px, 5vw, 42px);
		text-align: center;
		margin: 0 0 4px;
	}
	.subtitle {
		text-align: center;
		font-style: italic;
		color: var(--gray-2);
		margin: 0 0 28px;
	}
	.group {
		margin-bottom: 26px;
	}
	.group-title {
		border-bottom: 2px solid var(--ink);
		padding-bottom: 6px;
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--red);
	}
	.unit-row {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		padding: 14px 4px;
		border: none;
		border-bottom: 1px solid rgba(27, 23, 18, 0.16);
		background: none;
		cursor: pointer;
		transition: background 0.16s;
		text-align: left;
		font-family: inherit;
	}
	.unit-row:hover {
		background: #efe9db;
	}
	.unit-left {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
	}
	.unit-icon {
		width: 34px;
		height: 34px;
		flex: none;
		border: 1px solid var(--ink);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--ink);
	}
	.unit-name {
		font-family: 'Libre Baskerville';
		font-weight: 700;
		font-size: 20px;
		color: var(--ink);
	}
	.unit-rate {
		font-size: 12px;
		color: var(--gray-1);
		font-style: italic;
		text-align: right;
		white-space: nowrap;
	}
</style>
