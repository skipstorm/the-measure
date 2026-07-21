export function applyKey(current: string, key: string): string {
	if (key === 'back') return current.slice(0, -1);
	if (key === 'clear') return '';
	if (key === '.') {
		if (current.includes('.')) return current;
		return (current === '' ? '0' : current) + '.';
	}
	if (current === '0') return key;
	if (current.replace('.', '').length >= 12) return current;
	return current + key;
}
