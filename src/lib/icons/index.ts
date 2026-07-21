import type { IconPrimitive } from './types';
import {
	ruler,
	weight,
	squareUnit,
	beakerUnit,
	clockUnit,
	ampereUnit,
	thermometerUnit,
	moleUnit,
	candelaUnit,
	mapBlob
} from './families';
import * as oneOff from './one-off';

export type { IconPrimitive, UnitIconRef } from './types';

export const ICONS: Record<string, (label?: string) => IconPrimitive[]> = {
	// Parametrized label-badge families
	ruler,
	weight,
	square: squareUnit,
	beaker: beakerUnit,
	clock: clockUnit,
	ampere: ampereUnit,
	thermometer: thermometerUnit,
	mole: moleUnit,
	candela: candelaUnit,
	map: mapBlob,

	// One-off pictograms (label argument ignored)
	bus: oneOff.bus,
	'football-pitch': oneOff.footballPitch,
	'paper-sheet': oneOff.paperSheet,
	banana: oneOff.banana,
	'globe-trip': oneOff.globeTrip,
	'earth-moon': oneOff.earthMoon,
	'pisa-tower': oneOff.pisaTower,
	'eiffel-tower': oneOff.eiffelTower,
	'pyramid-giza': oneOff.pyramidGiza,
	'fiat-panda': oneOff.fiatPanda,
	'pickup-truck': oneOff.pickupTruck,
	'blue-whale': oneOff.blueWhale,
	'great-wall': oneOff.greatWall,
	'tennis-court': oneOff.tennisCourt,
	elephant: oneOff.elephant,
	horse: oneOff.horse,
	'pasta-pack': oneOff.pastaPack,
	hamster: oneOff.hamster,
	'jet-plane': oneOff.jetPlane,
	apple: oneOff.apple,
	'swimming-pool': oneOff.swimmingPool,
	'water-drop': oneOff.waterDrop,
	teaspoon: oneOff.teaspoon,
	teacup: oneOff.teacup,
	'drinking-glass': oneOff.drinkingGlass,
	'eye-blink': oneOff.eyeBlink,
	'sun-day': oneOff.sunDay,
	'earth-globe': oneOff.earthGlobe,
	'ringed-planet': oneOff.ringedPlanet,
	'led-diode': oneOff.ledDiode,
	'phone-charger': oneOff.phoneCharger,
	toaster: oneOff.toaster,
	'car-battery': oneOff.carBattery,
	'lightning-bolt': oneOff.lightningBolt,
	'body-temp': oneOff.bodyTemp,
	'earth-core': oneOff.earthCore,
	'metal-ingot': oneOff.metalIngot,
	'molten-blob': oneOff.moltenBlob,
	'sun-surface': oneOff.sunSurface,
	'frying-pan': oneOff.fryingPan,
	'dozen-dots': oneOff.dozenDots,
	population: oneOff.population,
	'sand-dune': oneOff.sandDune,
	star: oneOff.star,
	'candle-flame': oneOff.candleFlame,
	'light-bulb': oneOff.lightBulb,
	'car-headlight': oneOff.carHeadlight,
	lighthouse: oneOff.lighthouse,

	// Fallback
	default: () => [{ type: 'circle', cx: 12, cy: 12, r: 7 }]
};
