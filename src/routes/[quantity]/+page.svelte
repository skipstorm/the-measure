<script lang="ts">
	import { base } from '$app/paths';
	import QuantityIcon from '$lib/components/QuantityIcon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let { data } = $props();
	let q = $derived(data.quantity);
</script>

<svelte:head>
	<title>{q.name} — The Measure</title>
</svelte:head>

<PageHeader backLabel="Front Page" backHref="{base}/" rightText={q.name} />

<div class="page">
	<div class="head">
		<div class="icon"><QuantityIcon id={q.id} size={34} /></div>
		<span class="dept">Department of {q.name}</span>
	</div>
	<h2 class="name">{q.name}</h2>
	<div class="blurb">{q.blurb}</div>

	<div class="cards">
		<a class="card" href="{base}/{q.id}/plain">
			<div class="section-label">Section I</div>
			<div class="card-title">In Plain Terms</div>
			<div class="card-body">
				Enter a value in {q.basePlural} and read it back in the vernacular — buses, bananas, and the distance
				to the Moon.
			</div>
			<div class="card-cta">Enter →</div>
		</a>
		<a class="card" href="{base}/{q.id}/convert">
			<div class="section-label">Section II</div>
			<div class="card-title">Direct Conversion</div>
			<div class="card-body">
				Convert one unit into another, from the International System to the wholly unofficial.
			</div>
			<div class="card-cta">Enter →</div>
		</a>
	</div>
</div>

<style>
	.page {
		animation: pageIn 0.4s ease;
		max-width: 1000px;
		margin: 0 auto;
		padding: 46px 24px 80px;
	}
	.head {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}
	.icon {
		width: 64px;
		height: 64px;
		border: 1.5px solid var(--ink);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dept {
		font-size: 12px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--red);
	}
	.name {
		font-family: 'Libre Baskerville';
		font-weight: 900;
		font-size: clamp(38px, 7vw, 68px);
		text-align: center;
		margin: 8px 0 10px;
	}
	.blurb {
		text-align: center;
		font-style: italic;
		color: var(--gray-2);
		max-width: 600px;
		margin: 0 auto 40px;
		font-size: 17px;
		text-wrap: pretty;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
		gap: 22px;
	}
	.card {
		cursor: pointer;
		border: 1px solid var(--ink);
		background: var(--paper-1);
		padding: 30px 28px;
		transition:
			background 0.2s,
			transform 0.2s;
		color: inherit;
		display: block;
	}
	.card:hover {
		background: #efe9db;
		transform: translateY(-3px);
	}
	.section-label {
		font-size: 11px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--red);
	}
	.card-title {
		font-family: 'Libre Baskerville';
		font-weight: 900;
		font-size: 29px;
		margin: 8px 0 12px;
	}
	.card-body {
		color: var(--gray-2);
		font-size: 15px;
		line-height: 1.5;
		text-wrap: pretty;
	}
	.card-cta {
		margin-top: 18px;
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--red);
	}
</style>
