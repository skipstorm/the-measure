<script lang="ts">
	let { onKey, active = true }: { onKey: (key: string) => void; active?: boolean } = $props();

	const keydefs: [string, string][] = [
		['7', '7'],
		['8', '8'],
		['9', '9'],
		['4', '4'],
		['5', '5'],
		['6', '6'],
		['1', '1'],
		['2', '2'],
		['3', '3'],
		['.', '.'],
		['0', '0'],
		['⌫', 'back']
	];

	$effect(() => {
		if (!active) return;
		function handler(e: KeyboardEvent) {
			const k = e.key;
			if (k >= '0' && k <= '9') {
				onKey(k);
				e.preventDefault();
			} else if (k === '.' || k === ',') {
				onKey('.');
				e.preventDefault();
			} else if (k === 'Backspace') {
				onKey('back');
				e.preventDefault();
			} else if (k === 'Escape' || k === 'Delete') {
				onKey('clear');
				e.preventDefault();
			}
		}
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});
</script>

<div class="keypad">
	{#each keydefs as [label, raw] (raw)}
		<button type="button" class="key" onclick={() => onKey(raw)}>
			<span class="cap">{label}</span>
		</button>
	{/each}
</div>

<style>
	.keypad {
		background: linear-gradient(175deg, #373126, #211d16);
		border-radius: 18px;
		padding: 20px 18px 24px;
		box-shadow:
			0 12px 26px rgba(27, 23, 18, 0.35),
			inset 0 1px 0 rgba(255, 255, 255, 0.09),
			inset 0 -6px 12px rgba(0, 0, 0, 0.35);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 18px 14px;
		justify-items: center;
	}

	.key {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		border: none;
		padding: 4px;
		background: linear-gradient(165deg, #efe9d8, #98907c 55%, #4e483a);
		cursor: pointer;
		box-shadow:
			0 6px 0 rgba(0, 0, 0, 0.55),
			0 9px 12px rgba(0, 0, 0, 0.45);
		transition:
			transform 0.07s ease,
			box-shadow 0.07s ease,
			filter 0.12s;
		display: flex;
		align-items: stretch;
		justify-content: center;
	}

	.key:hover {
		filter: brightness(1.07);
	}

	.key:active {
		transform: translateY(5px);
		box-shadow:
			0 1px 0 rgba(0, 0, 0, 0.55),
			0 3px 5px rgba(0, 0, 0, 0.4);
	}

	.cap {
		flex: 1;
		border-radius: 50%;
		background: radial-gradient(circle at 50% 32%, #fdfaf1, #e9e1cc 72%, #d8cdb2);
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		font-family: 'Libre Baskerville';
		font-weight: 700;
		font-size: 26px;
		color: #26211a;
		box-shadow:
			inset 0 2px 3px rgba(255, 255, 255, 0.9),
			inset 0 -3px 6px rgba(0, 0, 0, 0.22);
		padding: 0 0 4px 0;
	}
</style>
