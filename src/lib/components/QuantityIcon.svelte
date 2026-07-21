<script lang="ts">
	let { id, size = 30 }: { id: string; size?: number } = $props();
</script>

<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
	{#if id === 'length'}
		<rect x="3" y="8.5" width="18" height="7" rx="1" />
		<line x1="7.5" y1="8.5" x2="7.5" y2="12" />
		<line x1="12" y1="8.5" x2="12" y2="12.5" />
		<line x1="16.5" y1="8.5" x2="16.5" y2="12" />
	{:else if id === 'area'}
		<rect x="6" y="8" width="14" height="13" rx="1" />
		<line x1="6" y1="4" x2="20" y2="4" />
		<line x1="6" y1="2" x2="6" y2="6" />
		<line x1="20" y1="2" x2="20" y2="6" />
		<line x1="2" y1="8" x2="2" y2="21" />
		<line x1="0" y1="8" x2="4" y2="8" />
		<line x1="0" y1="21" x2="4" y2="21" />
	{:else if id === 'mass'}
		<path d="M8.6 8.5a3.4 3.4 0 0 1 6.8 0" />
		<path d="M6.8 8.9h10.4l1.35 9.4a1 1 0 0 1-1 1.2H6.45a1 1 0 0 1-1-1.2Z" />
	{:else if id === 'volume'}
		<path d="M9 3h6v4l3.2 9.3a2 2 0 0 1-1.9 2.7H7.7a2 2 0 0 1-1.9-2.7L9 7Z" />
		<line x1="9" y1="3" x2="15" y2="3" />
		<line x1="7.3" y1="13" x2="16.7" y2="13" />
	{:else if id === 'time'}
		<circle cx="12" cy="12" r="9" />
		<line x1="12" y1="12" x2="12" y2="7" />
		<line x1="12" y1="12" x2="15.5" y2="13.5" />
	{:else if id === 'current'}
		<polygon points="13,2 5,13.5 11,13.5 10,22 18,10 12,10" />
	{:else if id === 'temperature'}
		<rect x="10.3" y="4" width="3.4" height="11" rx="1.7" />
		<circle cx="12" cy="17" r="3" />
		<line x1="14.6" y1="7" x2="16" y2="7" />
		<line x1="14.6" y1="10" x2="16" y2="10" />
	{:else if id === 'amount'}
		<circle cx="7" cy="8" r="2.2" />
		<circle cx="17" cy="8" r="2.2" />
		<circle cx="12" cy="16.5" r="2.2" />
		<line x1="8.7" y1="9.2" x2="10.5" y2="15" />
		<line x1="15.3" y1="9.2" x2="13.5" y2="15" />
		<line x1="9" y1="8" x2="15" y2="8" />
	{:else if id === 'luminous'}
		<circle cx="12" cy="12" r="4" />
		<line x1="12" y1="2.5" x2="12" y2="4.8" />
		<line x1="12" y1="19.2" x2="12" y2="21.5" />
		<line x1="2.5" y1="12" x2="4.8" y2="12" />
		<line x1="19.2" y1="12" x2="21.5" y2="12" />
		<line x1="5.3" y1="5.3" x2="6.9" y2="6.9" />
		<line x1="17.1" y1="17.1" x2="18.7" y2="18.7" />
		<line x1="18.7" y1="5.3" x2="17.1" y2="6.9" />
		<line x1="6.9" y1="17.1" x2="5.3" y2="18.7" />
	{/if}
</svg>
