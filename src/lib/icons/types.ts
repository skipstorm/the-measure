export type IconPrimitive =
	| { type: 'rect'; x: number; y: number; w: number; h: number; rx?: number }
	| { type: 'line'; x1: number; y1: number; x2: number; y2: number }
	| { type: 'circle'; cx: number; cy: number; r: number; fill?: string; stroke?: string }
	| { type: 'ellipse'; cx: number; cy: number; rx: number; ry: number; transform?: string }
	| { type: 'path'; d: string; fill?: string }
	| { type: 'polygon'; points: string }
	| { type: 'polyline'; points: string }
	| { type: 'text'; x: number; y: number; fontSize: number; text: string }
	| { type: 'g'; transform?: string; strokeWidth?: number; children: IconPrimitive[] };

export interface UnitIconRef {
	/** Icon name in the icon library (see src/lib/icons/index.ts). */
	n: string;
	/** Optional label/symbol shown by label-badge icon families (e.g. 'cm', '°C', 'ITA'). */
	s?: string;
}
