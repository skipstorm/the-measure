import { error } from '@sveltejs/kit';
import { quantityById } from '$lib/data';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const quantity = quantityById(params.quantity);
	if (!quantity || !quantity.active) {
		error(404, 'No such quantity is yet catalogued.');
	}
	return { quantity };
};
