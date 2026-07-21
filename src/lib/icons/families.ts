import type { IconPrimitive } from './types';

function label(text: string | undefined, y: number, fontSize: number): IconPrimitive[] {
	return text ? [{ type: 'text', x: 12, y, fontSize, text }] : [];
}

export function ruler(s?: string): IconPrimitive[] {
	return [
		{ type: 'rect', x: 2.5, y: 8, w: 19, h: 8.5, rx: 1 },
		{ type: 'line', x1: 6.5, y1: 8, x2: 6.5, y2: 10 },
		{ type: 'line', x1: 10.5, y1: 8, x2: 10.5, y2: 10.5 },
		{ type: 'line', x1: 14.5, y1: 8, x2: 14.5, y2: 10 },
		{ type: 'line', x1: 18.5, y1: 8, x2: 18.5, y2: 10.5 },
		...label(s, 22.5, 6.6)
	];
}

export function weight(s?: string): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M8.6 8.5a3.4 3.4 0 0 1 6.8 0' },
		{ type: 'path', d: 'M6.8 8.9h10.4l1.35 9.4a1 1 0 0 1-1 1.2H6.45a1 1 0 0 1-1-1.2Z' },
		...label(s, 17, 6.4)
	];
}

export function squareUnit(s?: string): IconPrimitive[] {
	return [
		{ type: 'rect', x: 4, y: 5, w: 16, h: 15, rx: 1.5 },
		{ type: 'line', x1: 4, y1: 3, x2: 20, y2: 3 },
		{ type: 'line', x1: 2, y1: 5, x2: 2, y2: 20 },
		...label(s, 15, 5.4)
	];
}

export function beakerUnit(s?: string): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M9 3h6v4l3.2 9.3a2 2 0 0 1-1.9 2.7H7.7a2 2 0 0 1-1.9-2.7L9 7Z' },
		{ type: 'line', x1: 9, y1: 3, x2: 15, y2: 3 },
		{ type: 'line', x1: 7.3, y1: 13, x2: 16.7, y2: 13 },
		...label(s, 23, 4.6)
	];
}

export function clockUnit(s?: string): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 9, r: 6 },
		{ type: 'line', x1: 12, y1: 9, x2: 12, y2: 5.5 },
		{ type: 'line', x1: 12, y1: 9, x2: 15, y2: 10.5 },
		...label(s, 21, 6)
	];
}

export function ampereUnit(s?: string): IconPrimitive[] {
	return [{ type: 'polygon', points: '12,2 6,13 11,13 10,21 17,9 12,9' }, ...label(s, 23, 5.4)];
}

export function thermometerUnit(s?: string): IconPrimitive[] {
	return [
		{ type: 'rect', x: 10.3, y: 2, w: 3.4, h: 10, rx: 1.7 },
		{ type: 'circle', cx: 12, cy: 15, r: 3 },
		{ type: 'line', x1: 13.7, y1: 5, x2: 15, y2: 5 },
		{ type: 'line', x1: 13.7, y1: 8, x2: 15, y2: 8 },
		...label(s, 23, 5)
	];
}

export function moleUnit(s?: string): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 10, r: 1.8 },
		{ type: 'ellipse', cx: 12, cy: 10, rx: 7, ry: 3 },
		{ type: 'ellipse', cx: 12, cy: 10, rx: 7, ry: 3, transform: 'rotate(60 12 10)' },
		{ type: 'ellipse', cx: 12, cy: 10, rx: 7, ry: 3, transform: 'rotate(120 12 10)' },
		...label(s, 23, 5)
	];
}

export function candelaUnit(s?: string): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 9, r: 4 },
		{ type: 'line', x1: 12, y1: 2, x2: 12, y2: 4 },
		{ type: 'line', x1: 5, y1: 9, x2: 7, y2: 9 },
		{ type: 'line', x1: 17, y1: 9, x2: 19, y2: 9 },
		{ type: 'line', x1: 6.8, y1: 3.8, x2: 8.2, y2: 5.2 },
		{ type: 'line', x1: 15.8, y1: 5.2, x2: 17.2, y2: 3.8 },
		...label(s, 23, 5)
	];
}

export function mapBlob(s?: string): IconPrimitive[] {
	return [
		{
			type: 'path',
			d: 'M4 7c1.5-2.5 4-2.5 6-1s3.5-2 6-1 4 2 4 4-2 3-4 4-4 1-6 0-4.5 1-6-1-2-3.5 0-2.5'
		},
		...label(s, 14, 5.4)
	];
}
