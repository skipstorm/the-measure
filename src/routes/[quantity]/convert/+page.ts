import type { PageLoad } from './$types';

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
