import type { PageLoad } from './$types';

// Reads the request query string (to/from/value), so it can't be prerendered — served via the SPA fallback.
export const prerender = false;

export const load: PageLoad = async ({ url, parent }) => {
	const { quantity } = await parent();
	const to = url.searchParams.get('to');
	const from = url.searchParams.get('from');
	const value = url.searchParams.get('value');
	return {
		initialFrom: from || quantity.defaultUnits!.from,
		initialTo: to || quantity.defaultUnits!.to,
		initialValue: value || ''
	};
};
