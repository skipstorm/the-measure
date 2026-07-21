import { splitDecimal, digitCount } from './format';

/** Non-cumulative digit-count bands: each is evaluated against the raw count, not the previous band's result. */
export function scaleForDigits(count: number): number {
	if (count > 15) return 0.2;
	if (count > 12) return 0.3;
	if (count > 8) return 0.4;
	if (count > 5) return 0.5;
	if (count > 3) return 0.7;
	return 1;
}

export interface ScaledParts {
	intPart: string;
	decPart: string;
	/** Multiplier (0-1) to apply to the caller's base size for the integer part. */
	intScale: number;
	/** Multiplier (0-1) to apply to the caller's base size for the decimal part (already includes the flat 80% discount). */
	decScale: number;
}

/**
 * Splits a formatted (or raw, unformatted) numeric string into integer/decimal parts and
 * computes each part's size *scale factor* independently from its own digit count. The decimal
 * part carries an additional flat 80% discount so it stays visually subordinate to the integer part.
 *
 * Scales are unitless multipliers, not absolute sizes: callers combine them with their own base size
 * (a fixed rem value, or a responsive `clamp(...)` expression) via `calc()`, so digit-count scaling
 * composes with — rather than replaces — any existing viewport-based responsiveness.
 */
export function scaledParts(value: string): ScaledParts {
	const { intPart, decPart } = splitDecimal(value);
	const intScale = scaleForDigits(digitCount(intPart));
	const decScale = scaleForDigits(digitCount(decPart)) * 0.8;
	return { intPart, decPart, intScale, decScale };
}

/**
 * Significant figures of an already-formatted number. Leading zeros never count; trailing zeros
 * count only past a decimal point ("100" → 1, "0.5" → 1, "3.14" → 3, "26,706,743" → 8).
 */
export function significantFigures(formatted: string): number {
	const digits = formatted.replace(/[^0-9]/g, '').replace(/^0+/, '');
	if (digits === '') return 0;
	return formatted.includes('.') ? digits.length : digits.replace(/0+$/, '').length || 1;
}

/**
 * Ranks how easy a displayed count is to grasp — LOWER is nicer, for sorting ascending.
 * Two effects combine: distance from 1 on a log scale (so 1 beats 10, and 0.5 beats 100), plus a
 * milder penalty per significant figure (so a clean integer beats a slightly-closer-but-messier value).
 * Non-finite or non-positive counts (e.g. an empty input rendering 0) rank last.
 */
export function readabilityScore(count: number, formatted: string): number {
	if (!isFinite(count) || count <= 0) return Infinity;
	const magnitude = Math.abs(Math.log10(count));
	const sig = Math.max(0, significantFigures(formatted) - 1);
	return magnitude + sig * 0.35;
}
