export function fmt(n: number): string {
	if (!isFinite(n)) return '—';
	if (n === 0) return '0';
	const a = Math.abs(n);
	let d: number;
	if (a >= 1000) d = 0;
	else if (a >= 100) d = 1;
	else if (a >= 1) d = 2;
	else if (a >= 0.1) d = 3;
	else if (a >= 0.001) d = 5;
	else d = 8;
	return n.toLocaleString('en-US', { maximumFractionDigits: d });
}

export function splitDecimal(s: string): { intPart: string; decPart: string } {
	// Only '.' is ever a decimal separator here — fmt() always formats with the 'en-US' locale,
	// where ',' is exclusively a thousands separator and must stay part of the integer part.
	const dot = s.indexOf('.');
	return {
		intPart: dot >= 0 ? s.slice(0, dot) : s,
		decPart: dot >= 0 ? s.slice(dot) : ''
	};
}

export function digitCount(s: string): number {
	return (s.match(/\d/g) || []).length;
}
