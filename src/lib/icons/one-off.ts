import type { IconPrimitive } from './types';

// Each one-off icon is a fixed pictogram; the label argument (if any is passed) is ignored.

export function bus(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 2.5, y: 7, w: 17, h: 9, rx: 2 },
		{ type: 'circle', cx: 7, cy: 17.5, r: 1.6 },
		{ type: 'circle', cx: 15, cy: 17.5, r: 1.6 },
		{ type: 'line', x1: 5, y1: 8, x2: 5, y2: 15 },
		{ type: 'line', x1: 9, y1: 8, x2: 9, y2: 15 },
		{ type: 'line', x1: 13, y1: 8, x2: 13, y2: 15 },
		{ type: 'line', x1: 17, y1: 9, x2: 19.5, y2: 9 },
		{ type: 'line', x1: 19.5, y1: 9, x2: 19.5, y2: 14 }
	];
}

export function footballPitch(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 2.5, y: 6, w: 19, h: 12, rx: 1 },
		{ type: 'line', x1: 12, y1: 6, x2: 12, y2: 18 },
		{ type: 'circle', cx: 12, cy: 12, r: 2.2 },
		{ type: 'path', d: 'M2.5 9.5h2.5v5H2.5' },
		{ type: 'path', d: 'M21.5 9.5h-2.5v5h2.5' }
	];
}

export function paperSheet(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M6 3h8l4 4v14H6z' },
		{ type: 'polyline', points: '14,3 14,7 18,7' },
		{ type: 'line', x1: 8.5, y1: 12, x2: 15.5, y2: 12 },
		{ type: 'line', x1: 8.5, y1: 15, x2: 15.5, y2: 15 },
		{ type: 'line', x1: 8.5, y1: 18, x2: 13, y2: 18 }
	];
}

export function banana(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5' },
		{
			type: 'path',
			d: 'M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z'
		}
	];
}

export function globeTrip(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 12, r: 9 },
		{ type: 'ellipse', cx: 12, cy: 12, rx: 4, ry: 9 },
		{ type: 'line', x1: 3, y1: 12, x2: 21, y2: 12 },
		{ type: 'line', x1: 4.5, y1: 8, x2: 19.5, y2: 8 },
		{ type: 'line', x1: 4.5, y1: 16, x2: 19.5, y2: 16 }
	];
}

export function earthMoon(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 7, cy: 12, r: 4.5 },
		{ type: 'circle', cx: 18, cy: 8, r: 2 },
		{ type: 'line', x1: 11.5, y1: 12, x2: 16, y2: 9 }
	];
}

export function pisaTower(): IconPrimitive[] {
	return [
		{
			type: 'g',
			transform: 'rotate(8 12 12)',
			children: [
				{ type: 'rect', x: 8, y: 2, w: 8, h: 20, rx: 3 },
				{ type: 'line', x1: 8, y1: 6, x2: 16, y2: 6 },
				{ type: 'line', x1: 8, y1: 10, x2: 16, y2: 10 },
				{ type: 'line', x1: 8, y1: 14, x2: 16, y2: 14 },
				{ type: 'line', x1: 8, y1: 18, x2: 16, y2: 18 }
			]
		}
	];
}

export function eiffelTower(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M12 2 5 21M12 2l7 19' },
		{ type: 'line', x1: 8.3, y1: 13, x2: 15.7, y2: 13 },
		{ type: 'line', x1: 6.6, y1: 18, x2: 17.4, y2: 18 },
		{ type: 'line', x1: 9.6, y1: 8, x2: 14.4, y2: 8 }
	];
}

export function pyramidGiza(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M12 4 22 20H2Z' },
		{ type: 'line', x1: 9, y1: 13, x2: 15, y2: 13 },
		{ type: 'line', x1: 7, y1: 16.5, x2: 17, y2: 16.5 }
	];
}

export function fiatPanda(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 3, y: 9, w: 18, h: 6, rx: 2 },
		{ type: 'path', d: 'M6 9c0-2 1.5-3 3-3h6c1.5 0 3 1 3 3' },
		{ type: 'circle', cx: 7.5, cy: 17, r: 2 },
		{ type: 'circle', cx: 16.5, cy: 17, r: 2 }
	];
}

export function pickupTruck(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M2 15h3l1.5-4h6l2 4h7v3H2Z' },
		{ type: 'path', d: 'M6.5 11h5v4h-5Z' },
		{ type: 'circle', cx: 7, cy: 18, r: 1.8 },
		{ type: 'circle', cx: 17, cy: 18, r: 1.8 }
	];
}

export function blueWhale(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M2 13c4-5 12-6 17-3 2 1.2 3 2.4 3 2.4s-3 .6-5 .6c-6 0-12-1-15 0Z' },
		{ type: 'path', d: 'M19 10.4c1.5-1.5 3-1 3 .6-1 .8-2 1-3-.6Z' },
		{ type: 'path', d: 'M19 12.6c1.5 1.7 3 1.2 3-.4-1-.9-2-1-3 .4Z' },
		{ type: 'line', x1: 6, y1: 12, x2: 4, y2: 15 }
	];
}

export function greatWall(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M2 18c3-6 6-6 8 0' },
		{ type: 'path', d: 'M10 18c2-5 4-5 6 0' },
		{ type: 'path', d: 'M2 15h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2' }
	];
}

export function tennisCourt(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 3, y: 4, w: 18, h: 16, rx: 1 },
		{ type: 'line', x1: 3, y1: 12, x2: 21, y2: 12 },
		{ type: 'line', x1: 9, y1: 4, x2: 9, y2: 20 },
		{ type: 'line', x1: 15, y1: 4, x2: 15, y2: 20 }
	];
}

export function elephant(): IconPrimitive[] {
	return [
		{
			type: 'g',
			transform: 'scale(0.5)',
			strokeWidth: 3,
			children: [
				{
					type: 'path',
					fill: 'none',
					d: 'M16.7942 12C12.7417 11.1116 4 12.1925 4 21.7874V40H9.86912V33.7811H26.638V40H32.5071V28.8949C33.2058 28.3026 34.4075 33.0231 36.6994 34.2253C38.0521 34.9349 39.2147 35.3968 40.4724 35.1137C43.1948 34.5009 44.4969 32.715 43.8261 28.4507C42.5685 29.9313 38.7955 31.5429 38.3763 28.4507C38.3763 24.8798 38.3763 15.5687 38.3763 15.5687C37.957 12.9035 35.5255 7.66183 29.1534 8.01719H22.2842C19.3497 8 14.9898 12.0148 15.9959 17.3452C16.3082 19 17.5 22.3045 21.7035 22.6757C23.3804 22.8238 26.1534 22.1427 27.8302 18.2336'
				},
				{ type: 'circle', cx: 33, cy: 19, r: 2, fill: 'currentColor', stroke: 'none' }
			]
		}
	];
}

export function horse(): IconPrimitive[] {
	return [
		{
			type: 'path',
			d: 'M11.5 12H11m-6 3a4 4 0 0 0 4 4h7.8l.3.3a3 3 0 0 0 4-4.46L12 7c0-3-1-5-1-5S8 3 8 7c-4 1-6 3-6 3'
		},
		{ type: 'path', d: 'M6.14 17.8S4 19 2 22' }
	];
}

export function pastaPack(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 8, y: 3, w: 8, h: 18, rx: 1 },
		{ type: 'line', x1: 10, y1: 3, x2: 10, y2: 21 },
		{ type: 'line', x1: 12, y1: 3, x2: 12, y2: 21 },
		{ type: 'line', x1: 14, y1: 3, x2: 14, y2: 21 },
		{ type: 'rect', x: 8, y: 6, w: 8, h: 3 }
	];
}

export function hamster(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 13, r: 6 },
		{ type: 'circle', cx: 8.5, cy: 7.5, r: 2 },
		{ type: 'circle', cx: 15.5, cy: 7.5, r: 2 },
		{ type: 'circle', cx: 10, cy: 12, r: 0.7 },
		{ type: 'circle', cx: 14, cy: 12, r: 0.7 },
		{ type: 'path', d: 'M11 15c.6.6 1.4.6 2 0' }
	];
}

export function jetPlane(): IconPrimitive[] {
	return [{ type: 'path', d: 'M3 12 21 4 13 21l-2-7-7-2Z' }];
}

export function apple(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M12 8c-3-3-8-1-8 4a7 7 0 0 0 14 0c0-3-2-5-4-4Z' },
		{ type: 'line', x1: 12, y1: 8, x2: 12, y2: 5 },
		{ type: 'path', d: 'M12 6c1-2 3-2 4-1-1 2-3 2-4 1Z' }
	];
}

export function swimmingPool(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 2, y: 8, w: 20, h: 10, rx: 1 },
		{ type: 'line', x1: 2, y1: 13, x2: 22, y2: 13 },
		{ type: 'line', x1: 7, y1: 8, x2: 7, y2: 18 },
		{ type: 'line', x1: 12, y1: 8, x2: 12, y2: 18 },
		{ type: 'line', x1: 17, y1: 8, x2: 17, y2: 18 }
	];
}

export function waterDrop(): IconPrimitive[] {
	return [{ type: 'path', d: 'M12 2c4 5 6 8.5 6 11.5a6 6 0 0 1-12 0C6 10.5 8 7 12 2Z' }];
}

export function teaspoon(): IconPrimitive[] {
	return [
		{ type: 'ellipse', cx: 8, cy: 8, rx: 5, ry: 3.4 },
		{ type: 'line', x1: 11, y1: 10, x2: 19, y2: 20 }
	];
}

export function teacup(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 4, y: 8, w: 13, h: 9, rx: 2 },
		{ type: 'path', d: 'M17 10.5h2a2.3 2.3 0 0 1 0 4.6h-2' },
		{ type: 'line', x1: 6, y1: 8, x2: 6, y2: 6 },
		{ type: 'line', x1: 9, y1: 8, x2: 9, y2: 5.5 }
	];
}

export function drinkingGlass(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M7 4h10l-1.5 15a2 2 0 0 1-2 1.8h-3a2 2 0 0 1-2-1.8Z' },
		{ type: 'line', x1: 7.6, y1: 10, x2: 16.4, y2: 10 }
	];
}

export function eyeBlink(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z' },
		{ type: 'circle', cx: 12, cy: 12, r: 2.4 }
	];
}

export function sunDay(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 12, r: 5 },
		{ type: 'line', x1: 12, y1: 2, x2: 12, y2: 4 },
		{ type: 'line', x1: 12, y1: 20, x2: 12, y2: 22 },
		{ type: 'line', x1: 2, y1: 12, x2: 4, y2: 12 },
		{ type: 'line', x1: 20, y1: 12, x2: 22, y2: 12 },
		{ type: 'line', x1: 4.9, y1: 4.9, x2: 6.3, y2: 6.3 },
		{ type: 'line', x1: 17.7, y1: 17.7, x2: 19.1, y2: 19.1 },
		{ type: 'line', x1: 19.1, y1: 4.9, x2: 17.7, y2: 6.3 },
		{ type: 'line', x1: 6.3, y1: 17.7, x2: 4.9, y2: 19.1 }
	];
}

export function earthGlobe(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 12, r: 8 },
		{ type: 'ellipse', cx: 12, cy: 12, rx: 3.5, ry: 8 },
		{ type: 'line', x1: 4, y1: 12, x2: 20, y2: 12 },
		{ type: 'line', x1: 5, y1: 7, x2: 19, y2: 7 },
		{ type: 'line', x1: 5, y1: 17, x2: 19, y2: 17 }
	];
}

export function ringedPlanet(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 13, r: 3 },
		{ type: 'ellipse', cx: 12, cy: 13, rx: 9, ry: 3.2, transform: 'rotate(-15 12 13)' }
	];
}

export function ledDiode(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M4 12h8V7l7 5-7 5v-5H4Z' },
		{ type: 'line', x1: 15, y1: 5, x2: 17, y2: 3 },
		{ type: 'line', x1: 17, y1: 7, x2: 19, y2: 6 }
	];
}

export function phoneCharger(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 3, y: 9, w: 6, h: 6, rx: 1 },
		{ type: 'line', x1: 9, y1: 12, x2: 14, y2: 12 },
		{ type: 'rect', x: 14, y: 7, w: 6, h: 11, rx: 1.5 },
		{ type: 'line', x1: 16, y1: 16, x2: 18, y2: 16 }
	];
}

export function toaster(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 3, y: 9, w: 18, h: 9, rx: 2 },
		{ type: 'rect', x: 6, y: 5, w: 4, h: 5, rx: 1 },
		{ type: 'rect', x: 14, y: 5, w: 4, h: 5, rx: 1 }
	];
}

export function carBattery(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 4, y: 7, w: 16, h: 11, rx: 1 },
		{ type: 'line', x1: 9, y1: 7, x2: 9, y2: 4 },
		{ type: 'line', x1: 15, y1: 7, x2: 15, y2: 4 },
		{ type: 'line', x1: 4, y1: 12, x2: 20, y2: 12 }
	];
}

export function lightningBolt(): IconPrimitive[] {
	return [{ type: 'path', d: 'M13 2 5 14 11 14 10 22 19 10 12 10Z' }];
}

export function bodyTemp(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 7, r: 3 },
		{ type: 'path', d: 'M6 21c0-5 3-8 6-8s6 3 6 8' }
	];
}

export function earthCore(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 12, r: 9 },
		{ type: 'circle', cx: 12, cy: 12, r: 4 }
	];
}

export function metalIngot(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 6, y: 14, w: 12, h: 6, rx: 1 },
		{ type: 'path', d: 'M8 12c0-2 1-2 1-4s-1-2-1-4' },
		{ type: 'path', d: 'M12 12c0-2 1-2 1-4s-1-2-1-4' },
		{ type: 'path', d: 'M16 12c0-2 1-2 1-4s-1-2-1-4' }
	];
}

export function moltenBlob(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M6 18c0-4 2-7 6-7s6 3 6 7' },
		{ type: 'path', d: 'M9 9c0-1.5.7-1.5.7-3S9 4.5 9 3' },
		{ type: 'path', d: 'M15 9c0-1.5-.7-1.5-.7-3S15 4.5 15 3' }
	];
}

export function sunSurface(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 12, r: 6 },
		{ type: 'line', x1: 12, y1: 1, x2: 12, y2: 4 },
		{ type: 'line', x1: 12, y1: 20, x2: 12, y2: 23 },
		{ type: 'line', x1: 1, y1: 12, x2: 4, y2: 12 },
		{ type: 'line', x1: 20, y1: 12, x2: 23, y2: 12 },
		{ type: 'line', x1: 4.2, y1: 4.2, x2: 6.3, y2: 6.3 },
		{ type: 'line', x1: 17.7, y1: 17.7, x2: 19.8, y2: 19.8 },
		{ type: 'line', x1: 19.8, y1: 4.2, x2: 17.7, y2: 6.3 },
		{ type: 'line', x1: 6.3, y1: 17.7, x2: 4.2, y2: 19.8 }
	];
}

export function fryingPan(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 13, cy: 13, r: 7 },
		{ type: 'line', x1: 6, y1: 13, x2: 1, y2: 13 },
		{ type: 'circle', cx: 10, cy: 11, r: 0.9 },
		{ type: 'circle', cx: 14, cy: 10, r: 0.9 },
		{ type: 'circle', cx: 16, cy: 13, r: 0.9 }
	];
}

export function dozenDots(): IconPrimitive[] {
	const dots: IconPrimitive[] = [];
	for (const cy of [4, 9, 14, 19]) {
		for (const cx of [6, 12, 18]) {
			dots.push({ type: 'circle', cx, cy, r: 1.2 });
		}
	}
	return dots;
}

export function population(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 8, cy: 7, r: 2.4 },
		{ type: 'path', d: 'M4 19c0-3 2-5 4-5s4 2 4 5' },
		{ type: 'circle', cx: 16, cy: 7, r: 2.4 },
		{ type: 'path', d: 'M12.5 19c0-3 2-5 4-5s4 2 4 5' }
	];
}

export function sandDune(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M2 18c3-4 6-4 8-1 2-3 5-3 7 0 2-2 4-2 5 0' },
		{ type: 'circle', cx: 6, cy: 15, r: 0.6 },
		{ type: 'circle', cx: 10, cy: 16, r: 0.6 },
		{ type: 'circle', cx: 14, cy: 14.5, r: 0.6 },
		{ type: 'circle', cx: 17, cy: 16, r: 0.6 },
		{ type: 'circle', cx: 8, cy: 12, r: 0.6 }
	];
}

export function star(): IconPrimitive[] {
	return [{ type: 'path', d: 'M12 2l2.4 6.4L21 9l-5 4.6L17.4 21 12 17.3 6.6 21 8 13.6 3 9l6.6-.6Z' }];
}

export function candleFlame(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 9, y: 12, w: 6, h: 9, rx: 1 },
		{
			type: 'path',
			d: 'M12 3c1.6 2 2.4 3.6 1.6 5.2-.6-.4-1.2-.4-1.6.4-.4-.8-1-.8-1.6-.4C9.6 6.6 10.4 5 12 3Z'
		}
	];
}

export function lightBulb(): IconPrimitive[] {
	return [
		{ type: 'circle', cx: 12, cy: 9, r: 6 },
		{ type: 'line', x1: 9, y1: 15, x2: 15, y2: 15 },
		{ type: 'line', x1: 9.5, y1: 17, x2: 14.5, y2: 17 },
		{ type: 'line', x1: 10, y1: 19, x2: 14, y2: 19 },
		{ type: 'path', d: 'M9.5 8.5c1-2 4-2 5 0' }
	];
}

export function carHeadlight(): IconPrimitive[] {
	return [
		{ type: 'rect', x: 4, y: 8, w: 9, h: 8, rx: 4 },
		{ type: 'line', x1: 14, y1: 10, x2: 21, y2: 8 },
		{ type: 'line', x1: 14, y1: 12, x2: 22, y2: 12 },
		{ type: 'line', x1: 14, y1: 14, x2: 21, y2: 16 }
	];
}

export function lighthouse(): IconPrimitive[] {
	return [
		{ type: 'path', d: 'M10 22h4l-1-14h-2Z' },
		{ type: 'path', d: 'M9 8h6l-1-5H10Z' },
		{ type: 'line', x1: 15, y1: 5, x2: 20, y2: 3 },
		{ type: 'line', x1: 15, y1: 8, x2: 21, y2: 8 }
	];
}
