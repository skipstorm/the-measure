<script lang="ts">
	import { ICONS, type IconPrimitive, type UnitIconRef } from '$lib/icons';

	let { icon, size = 28 }: { icon: UnitIconRef; size?: number } = $props();

	let primitives = $derived((ICONS[icon.n] ?? ICONS.default)(icon.s));
</script>

{#snippet primitive(el: IconPrimitive)}
	{#if el.type === 'rect'}
		<rect x={el.x} y={el.y} width={el.w} height={el.h} rx={el.rx} />
	{:else if el.type === 'line'}
		<line x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} />
	{:else if el.type === 'circle'}
		<circle cx={el.cx} cy={el.cy} r={el.r} fill={el.fill} stroke={el.stroke} />
	{:else if el.type === 'ellipse'}
		<ellipse cx={el.cx} cy={el.cy} rx={el.rx} ry={el.ry} transform={el.transform} />
	{:else if el.type === 'path'}
		<path d={el.d} fill={el.fill} />
	{:else if el.type === 'polygon'}
		<polygon points={el.points} />
	{:else if el.type === 'polyline'}
		<polyline points={el.points} />
	{:else if el.type === 'text'}
		<text
			x={el.x}
			y={el.y}
			text-anchor="middle"
			font-size={el.fontSize}
			font-weight="700"
			font-family="'Libre Baskerville',Georgia,serif"
			fill="currentColor"
			stroke="none">{el.text}</text
		>
	{:else if el.type === 'g'}
		<g transform={el.transform} stroke-width={el.strokeWidth}>
			{#each el.children as child, i (i)}
				{@render primitive(child)}
			{/each}
		</g>
	{/if}
{/snippet}

<svg
	viewBox="0 0 24 24"
	width={size}
	height={size}
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	{#each primitives as el, i (i)}
		{@render primitive(el)}
	{/each}
</svg>
