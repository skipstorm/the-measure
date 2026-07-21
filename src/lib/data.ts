import type { UnitIconRef } from '$lib/icons';

export type Category = 'si' | 'customary' | 'practical';

export interface Unit {
	name: string;
	plural: string;
	f: number;
	off?: number;
	cat: Category;
	note?: string;
	icon: UnitIconRef;
}

export interface QuantityInfo {
	id: string;
	name: string;
	symbol: string;
	base: string;
	active: boolean;
	blurb: string;
	basePlural: string;
	baseSingular: string;
	defaultUnits: { from: string; to: string };
}

export const CATEGORY_LABELS: Record<Category, string> = {
	si: 'The International System',
	customary: 'Customary Units',
	practical: 'Practical Equivalences'
};

export const QUANTITIES: QuantityInfo[] = [
	{
		id: 'length',
		name: 'Length',
		symbol: 'L',
		base: 'metres',
		active: true,
		basePlural: 'metres',
		baseSingular: 'metre',
		blurb:
			'From the width of an atom to the reach of the cosmos — all of it, expressed in whatever you happen to have lying about.',
		defaultUnits: { from: 'metre', to: 'bus' }
	},
	{
		id: 'area',
		name: 'Area',
		symbol: 'A',
		base: 'square metres',
		active: true,
		basePlural: 'square metres',
		baseSingular: 'square metre',
		blurb: 'The ground a thing covers — pitches, nations, and the odd Alpine lake, all laid flat and measured.',
		defaultUnits: { from: 'square metre', to: 'football pitch' }
	},
	{
		id: 'mass',
		name: 'Mass',
		symbol: 'M',
		base: 'kilograms',
		active: true,
		basePlural: 'kilograms',
		baseSingular: 'kilogram',
		blurb:
			'How much there is of a thing, weighed faithfully against elephants, horses, and the family pasta reserve.',
		defaultUnits: { from: 'kilogram', to: 'elephant' }
	},
	{
		id: 'volume',
		name: 'Volume',
		symbol: 'V',
		base: 'litres',
		active: true,
		basePlural: 'litres',
		baseSingular: 'litre',
		blurb: 'The space a thing occupies — from a single drop to an Olympic swimming pool, brimming.',
		defaultUnits: { from: 'litre', to: 'glass' }
	},
	{
		id: 'time',
		name: 'Time',
		symbol: 'T',
		base: 'seconds',
		active: true,
		basePlural: 'seconds',
		baseSingular: 'second',
		blurb: 'The interval between one moment and the next — a blink, a day, a year, an age.',
		defaultUnits: { from: 'second', to: 'day' }
	},
	{
		id: 'current',
		name: 'Electric Current',
		symbol: 'I',
		base: 'amperes',
		active: true,
		basePlural: 'amperes',
		baseSingular: 'ampere',
		blurb: 'The flow of charge through a wire — from a blinking LED to the fury of a lightning bolt.',
		defaultUnits: { from: 'ampere', to: 'phone charger' }
	},
	{
		id: 'temperature',
		name: 'Temperature',
		symbol: 'Θ',
		base: 'kelvin',
		active: true,
		basePlural: 'kelvin',
		baseSingular: 'kelvin',
		blurb:
			'How hot or cold a thing runs, from absolute zero to the boiling point — Kelvin, Celsius, and Fahrenheit reconciled at last.',
		defaultUnits: { from: 'degree Celsius', to: 'Fahrenheit' }
	},
	{
		id: 'amount',
		name: 'Amount',
		symbol: 'N',
		base: 'units',
		active: true,
		basePlural: 'units',
		baseSingular: 'unit',
		blurb: 'A plain count of things — one at a time, by the dozen, or by the staggering multitude of Avogadro.',
		defaultUnits: { from: 'unit', to: 'dozen' }
	},
	{
		id: 'luminous',
		name: 'Luminous Intensity',
		symbol: 'J',
		base: 'candela',
		active: true,
		basePlural: 'candela',
		baseSingular: 'candela',
		blurb: 'The brightness of a source in a given direction — a candle flame, a headlight, a lighthouse beam.',
		defaultUnits: { from: 'candela', to: 'candle flame' }
	}
];

export const UNITS: Record<string, Unit[]> = {
	length: [
		{ name: 'kilometre', plural: 'kilometres', f: 1000, cat: 'si', icon: { n: 'ruler', s: 'km' } },
		{ name: 'metre', plural: 'metres', f: 1, cat: 'si', icon: { n: 'ruler', s: 'm' } },
		{ name: 'centimetre', plural: 'centimetres', f: 0.01, cat: 'si', icon: { n: 'ruler', s: 'cm' } },
		{ name: 'millimetre', plural: 'millimetres', f: 0.001, cat: 'si', icon: { n: 'ruler', s: 'mm' } },
		{ name: 'mile', plural: 'miles', f: 1609.344, cat: 'customary', icon: { n: 'ruler', s: 'mi' } },
		{ name: 'yard', plural: 'yards', f: 0.9144, cat: 'customary', icon: { n: 'ruler', s: 'yd' } },
		{ name: 'foot', plural: 'feet', f: 0.3048, cat: 'customary', icon: { n: 'ruler', s: 'ft' } },
		{ name: 'inch', plural: 'inches', f: 0.0254, cat: 'customary', icon: { n: 'ruler', s: 'in' } },
		{
			name: 'nautical mile',
			plural: 'nautical miles',
			f: 1852,
			cat: 'customary',
			icon: { n: 'ruler', s: 'nmi' }
		},
		{
			name: 'bus',
			plural: 'buses',
			f: 12,
			cat: 'practical',
			note: 'Standard 12-metre city bus',
			icon: { n: 'bus' }
		},
		{
			name: 'football pitch',
			plural: 'football pitches',
			f: 105,
			cat: 'practical',
			note: 'Regulation length under IFAB Law 1',
			icon: { n: 'football-pitch' }
		},
		{
			name: 'Copy paper thickness',
			plural: 'Copy paper thicknesses',
			f: 0.00007,
			cat: 'practical',
			note: 'The thickness of a single sheet of standard copy paper',
			icon: { n: 'paper-sheet' }
		},
		{
			name: 'banana',
			plural: 'bananas',
			f: 0.18,
			cat: 'practical',
			note: 'Average dessert banana, tip to stalk',
			icon: { n: 'banana' }
		},
		{
			name: 'trip around the world',
			plural: 'trips around the world',
			f: 40075017,
			cat: 'practical',
			note: "Earth's equatorial circumference",
			icon: { n: 'globe-trip' }
		},
		{
			name: 'Earth–Moon distance',
			plural: 'Earth–Moon distances',
			f: 384400000,
			cat: 'practical',
			note: 'Mean centre-to-centre separation',
			icon: { n: 'earth-moon' }
		},
		{
			name: 'Leaning Tower of Pisa',
			plural: 'Leaning Towers of Pisa',
			f: 55.9,
			cat: 'practical',
			note: 'Height of the bell tower at Pisa',
			icon: { n: 'pisa-tower' }
		},
		{
			name: 'Eiffel Tower',
			plural: 'Eiffel Towers',
			f: 330,
			cat: 'practical',
			note: 'Full height, including antennas',
			icon: { n: 'eiffel-tower' }
		},
		{
			name: 'Great Pyramid of Giza',
			plural: 'Great Pyramids of Giza',
			f: 138.8,
			cat: 'practical',
			note: 'Original limestone pyramid at Giza',
			icon: { n: 'pyramid-giza' }
		},
		{
			name: 'Fiat Panda',
			plural: 'Fiat Pandas',
			f: 3.69,
			cat: 'practical',
			note: 'Compact hatchback, bumper to bumper',
			icon: { n: 'fiat-panda' }
		},
		{
			name: 'Ford F-150',
			plural: 'Ford F-150s',
			f: 5.89,
			cat: 'practical',
			note: 'Full-size pickup, crew cab',
			icon: { n: 'pickup-truck' }
		},
		{
			name: 'Blue whale',
			plural: 'blue whales',
			f: 24,
			cat: 'practical',
			note: 'Average adult length',
			icon: { n: 'blue-whale' }
		},
		{
			name: 'Great Wall of China',
			plural: 'Great Walls of China',
			f: 21196000,
			cat: 'practical',
			note: 'Full surveyed length, including branches',
			icon: { n: 'great-wall' }
		}
	],
	area: [
		{
			name: 'square kilometre',
			plural: 'square kilometres',
			f: 1000000,
			cat: 'si',
			icon: { n: 'square', s: 'km²' }
		},
		{ name: 'hectare', plural: 'hectares', f: 10000, cat: 'si', icon: { n: 'square', s: 'ha' } },
		{ name: 'square metre', plural: 'square metres', f: 1, cat: 'si', icon: { n: 'square', s: 'm²' } },
		{
			name: 'square centimetre',
			plural: 'square centimetres',
			f: 0.0001,
			cat: 'si',
			icon: { n: 'square', s: 'cm²' }
		},
		{
			name: 'square mile',
			plural: 'square miles',
			f: 2589988.110336,
			cat: 'customary',
			icon: { n: 'square', s: 'mi²' }
		},
		{ name: 'acre', plural: 'acres', f: 4046.8564224, cat: 'customary', icon: { n: 'square', s: 'ac' } },
		{
			name: 'square yard',
			plural: 'square yards',
			f: 0.83612736,
			cat: 'customary',
			icon: { n: 'square', s: 'yd²' }
		},
		{
			name: 'square foot',
			plural: 'square feet',
			f: 0.09290304,
			cat: 'customary',
			icon: { n: 'square', s: 'ft²' }
		},
		{
			name: 'football pitch',
			plural: 'football pitches',
			f: 7140,
			cat: 'practical',
			note: 'Regulation pitch, roughly 105 × 68 m',
			icon: { n: 'football-pitch' }
		},
		{
			name: 'tennis court',
			plural: 'tennis courts',
			f: 261,
			cat: 'practical',
			note: 'Doubles court, baseline to baseline',
			icon: { n: 'tennis-court' }
		},
		{
			name: 'A4 sheet',
			plural: 'A4 sheets',
			f: 0.06237,
			cat: 'practical',
			note: 'Area of an ISO 216 A4 page (210 × 297 mm)',
			icon: { n: 'paper-sheet' }
		},
		{
			name: 'Vatican City',
			plural: 'Vatican City',
			f: 490000,
			cat: 'practical',
			note: "World's smallest sovereign state",
			icon: { n: 'map', s: 'VAT' }
		},
		{
			name: 'Italy',
			plural: 'Italy',
			f: 301340000000,
			cat: 'practical',
			note: 'Entire Italian territory',
			icon: { n: 'map', s: 'ITA' }
		},
		{
			name: 'France',
			plural: 'France',
			f: 551695000000,
			cat: 'practical',
			note: 'Metropolitan France',
			icon: { n: 'map', s: 'FRA' }
		},
		{
			name: 'Spain',
			plural: 'Spain',
			f: 505990000000,
			cat: 'practical',
			note: 'Entire Spanish territory',
			icon: { n: 'map', s: 'ESP' }
		},
		{
			name: 'Germany',
			plural: 'Germany',
			f: 357022000000,
			cat: 'practical',
			note: 'Entire German territory',
			icon: { n: 'map', s: 'GER' }
		},
		{
			name: 'Greenland',
			plural: 'Greenland',
			f: 2166086000000,
			cat: 'practical',
			note: "World's largest island",
			icon: { n: 'map', s: 'GRL' }
		},
		{
			name: 'Delaware',
			plural: 'Delaware',
			f: 6452000000,
			cat: 'practical',
			note: 'Second-smallest US state',
			icon: { n: 'map', s: 'DEL' }
		},
		{
			name: 'Texas',
			plural: 'Texas',
			f: 695662000000,
			cat: 'practical',
			note: 'Largest state in the contiguous US',
			icon: { n: 'map', s: 'TEX' }
		},
		{
			name: 'Australia',
			plural: 'Australia',
			f: 7692024000000,
			cat: 'practical',
			note: 'Smallest continent, largest island',
			icon: { n: 'map', s: 'AUS' }
		},
		{
			name: 'Caspian Sea',
			plural: 'Caspian Sea',
			f: 371000000000,
			cat: 'practical',
			note: "World's largest inland body of water",
			icon: { n: 'map', s: 'CAS' }
		},
		{
			name: 'Lake Superior',
			plural: 'Lake Superior',
			f: 82100000000,
			cat: 'practical',
			note: 'Largest of the Great Lakes by area',
			icon: { n: 'map', s: 'SUP' }
		},
		{
			name: 'Lake Como',
			plural: 'Lake Como',
			f: 146000000,
			cat: 'practical',
			note: 'Famed Y-shaped lake in Lombardy',
			icon: { n: 'map', s: 'COM' }
		},
		{
			name: 'Lake Tahoe',
			plural: 'Lake Tahoe',
			f: 496000000,
			cat: 'practical',
			note: 'Alpine lake on the California–Nevada line',
			icon: { n: 'map', s: 'TAH' }
		},
		{
			name: 'Lake Garda',
			plural: 'Lake Garda',
			f: 370000000,
			cat: 'practical',
			note: "Italy's largest lake",
			icon: { n: 'map', s: 'GAR' }
		},
		{
			name: 'Lake Victoria',
			plural: 'Lake Victoria',
			f: 68870000000,
			cat: 'practical',
			note: "Africa's largest lake by area",
			icon: { n: 'map', s: 'VIC' }
		}
	],
	mass: [
		{ name: 'tonne', plural: 'tonnes', f: 1000, cat: 'si', icon: { n: 'weight', s: 't' } },
		{ name: 'kilogram', plural: 'kilograms', f: 1, cat: 'si', icon: { n: 'weight', s: 'kg' } },
		{ name: 'gram', plural: 'grams', f: 0.001, cat: 'si', icon: { n: 'weight', s: 'g' } },
		{ name: 'milligram', plural: 'milligrams', f: 0.000001, cat: 'si', icon: { n: 'weight', s: 'mg' } },
		{ name: 'pound', plural: 'pounds', f: 0.45359237, cat: 'customary', icon: { n: 'weight', s: 'lb' } },
		{ name: 'ounce', plural: 'ounces', f: 0.028349523, cat: 'customary', icon: { n: 'weight', s: 'oz' } },
		{
			name: 'stone',
			plural: 'stone',
			f: 6.35029318,
			cat: 'customary',
			note: 'Imperial stone (14 lb)',
			icon: { n: 'weight', s: 'st' }
		},
		{
			name: 'US ton',
			plural: 'US tons',
			f: 907.18474,
			cat: 'customary',
			note: 'Short ton (2,000 lb)',
			icon: { n: 'weight', s: 'ton' }
		},
		{
			name: 'elephant',
			plural: 'elephants',
			f: 6000,
			cat: 'practical',
			note: 'Adult male African bush elephant',
			icon: { n: 'elephant' }
		},
		{
			name: 'horse',
			plural: 'horses',
			f: 500,
			cat: 'practical',
			note: 'Adult riding horse, average build',
			icon: { n: 'horse' }
		},
		{
			name: 'pack of pasta',
			plural: 'packs of pasta',
			f: 0.5,
			cat: 'practical',
			note: 'One sealed 500 g packet',
			icon: { n: 'pasta-pack' }
		},
		{
			name: 'hamster',
			plural: 'hamsters',
			f: 0.12,
			cat: 'practical',
			note: 'Well-fed Syrian hamster',
			icon: { n: 'hamster' }
		},
		{
			name: 'Boeing 747',
			plural: 'Boeing 747s',
			f: 180000,
			cat: 'practical',
			note: 'Approx. empty weight of a 747-400',
			icon: { n: 'jet-plane' }
		},
		{
			name: 'apple',
			plural: 'apples',
			f: 0.182,
			cat: 'practical',
			note: 'Average medium apple',
			icon: { n: 'apple' }
		}
	],
	volume: [
		{ name: 'cubic metre', plural: 'cubic metres', f: 1000, cat: 'si', icon: { n: 'beaker', s: 'm³' } },
		{ name: 'litre', plural: 'litres', f: 1, cat: 'si', icon: { n: 'beaker', s: 'L' } },
		{ name: 'centilitre', plural: 'centilitres', f: 0.01, cat: 'si', icon: { n: 'beaker', s: 'cL' } },
		{ name: 'millilitre', plural: 'millilitres', f: 0.001, cat: 'si', icon: { n: 'beaker', s: 'mL' } },
		{
			name: 'gallon',
			plural: 'gallons',
			f: 3.785411784,
			cat: 'customary',
			note: 'US liquid gallon',
			icon: { n: 'beaker', s: 'gal' }
		},
		{ name: 'quart', plural: 'quarts', f: 0.946352946, cat: 'customary', icon: { n: 'beaker', s: 'qt' } },
		{ name: 'pint', plural: 'pints', f: 0.473176473, cat: 'customary', icon: { n: 'beaker', s: 'pt' } },
		{
			name: 'fluid ounce',
			plural: 'fluid ounces',
			f: 0.0295735296,
			cat: 'customary',
			icon: { n: 'beaker', s: 'fl oz' }
		},
		{
			name: 'Olympic swimming pool',
			plural: 'Olympic swimming pools',
			f: 2500000,
			cat: 'practical',
			note: 'Standard 50 × 25 m competition pool',
			icon: { n: 'swimming-pool' }
		},
		{
			name: 'drop',
			plural: 'drops',
			f: 0.00005,
			cat: 'practical',
			note: 'Typical drop of water',
			icon: { n: 'water-drop' }
		},
		{
			name: 'teaspoon',
			plural: 'teaspoons',
			f: 0.005,
			cat: 'practical',
			note: 'Standard teaspoon, 5 mL',
			icon: { n: 'teaspoon' }
		},
		{
			name: 'teacup',
			plural: 'teacups',
			f: 0.2,
			cat: 'practical',
			note: 'Standard cup of tea',
			icon: { n: 'teacup' }
		},
		{
			name: 'glass',
			plural: 'glasses',
			f: 0.25,
			cat: 'practical',
			note: 'Standard drinking glass of water',
			icon: { n: 'drinking-glass' }
		}
	],
	time: [
		{ name: 'second', plural: 'seconds', f: 1, cat: 'si', icon: { n: 'clock', s: 's' } },
		{ name: 'millisecond', plural: 'milliseconds', f: 0.001, cat: 'si', icon: { n: 'clock', s: 'ms' } },
		{ name: 'microsecond', plural: 'microseconds', f: 0.000001, cat: 'si', icon: { n: 'clock', s: 'µs' } },
		{
			name: 'nanosecond',
			plural: 'nanoseconds',
			f: 0.000000001,
			cat: 'si',
			icon: { n: 'clock', s: 'ns' }
		},
		{ name: 'minute', plural: 'minutes', f: 60, cat: 'customary', icon: { n: 'clock', s: 'min' } },
		{ name: 'hour', plural: 'hours', f: 3600, cat: 'customary', icon: { n: 'clock', s: 'hr' } },
		{ name: 'week', plural: 'weeks', f: 604800, cat: 'customary', icon: { n: 'clock', s: 'wk' } },
		{
			name: 'blink of an eye',
			plural: 'blinks of an eye',
			f: 0.35,
			cat: 'practical',
			note: 'Average human eye blink',
			icon: { n: 'eye-blink' }
		},
		{
			name: 'day',
			plural: 'days',
			f: 86400,
			cat: 'practical',
			note: 'One full rotation of the Earth',
			icon: { n: 'sun-day' }
		},
		{
			name: 'Earth year',
			plural: 'Earth years',
			f: 31557600,
			cat: 'practical',
			note: 'One orbit of the Sun',
			icon: { n: 'earth-globe' }
		},
		{
			name: 'Pluto year',
			plural: 'Pluto years',
			f: 7824391344,
			cat: 'practical',
			note: 'One orbit of the Sun, roughly 247.9 Earth years',
			icon: { n: 'ringed-planet' }
		}
	],
	current: [
		{ name: 'kiloampere', plural: 'kiloamperes', f: 1000, cat: 'si', icon: { n: 'ampere', s: 'kA' } },
		{ name: 'ampere', plural: 'amperes', f: 1, cat: 'si', icon: { n: 'ampere', s: 'A' } },
		{ name: 'milliampere', plural: 'milliamperes', f: 0.001, cat: 'si', icon: { n: 'ampere', s: 'mA' } },
		{
			name: 'microampere',
			plural: 'microamperes',
			f: 0.000001,
			cat: 'si',
			icon: { n: 'ampere', s: 'µA' }
		},
		{
			name: 'biot',
			plural: 'biots',
			f: 10,
			cat: 'customary',
			note: 'CGS electromagnetic unit of current',
			icon: { n: 'ampere', s: 'Bi' }
		},
		{
			name: 'LED indicator',
			plural: 'LED indicators',
			f: 0.02,
			cat: 'practical',
			note: 'Typical indicator LED forward current',
			icon: { n: 'led-diode' }
		},
		{
			name: 'phone charger',
			plural: 'phone chargers',
			f: 2,
			cat: 'practical',
			note: 'Standard USB phone charging current',
			icon: { n: 'phone-charger' }
		},
		{
			name: 'toaster',
			plural: 'toasters',
			f: 8,
			cat: 'practical',
			note: 'Typical household toaster on a 230 V circuit',
			icon: { n: 'toaster' }
		},
		{
			name: 'car starter motor',
			plural: 'car starter motors',
			f: 200,
			cat: 'practical',
			note: 'Peak draw while cranking an engine',
			icon: { n: 'car-battery' }
		},
		{
			name: 'lightning bolt',
			plural: 'lightning bolts',
			f: 30000,
			cat: 'practical',
			note: 'Average peak current in a cloud-to-ground strike',
			icon: { n: 'lightning-bolt' }
		}
	],
	temperature: [
		{ name: 'kelvin', plural: 'kelvin', f: 1, off: 0, cat: 'si', icon: { n: 'thermometer', s: 'K' } },
		{
			name: 'degree Celsius',
			plural: 'degrees Celsius',
			f: 1,
			off: 273.15,
			cat: 'si',
			icon: { n: 'thermometer', s: '°C' }
		},
		{
			name: 'Fahrenheit',
			plural: 'Fahrenheit',
			f: 5 / 9,
			off: 459.67,
			cat: 'customary',
			icon: { n: 'thermometer', s: '°F' }
		},
		{
			name: 'Rankine',
			plural: 'Rankine',
			f: 5 / 9,
			off: 0,
			cat: 'customary',
			note: 'Absolute scale in Fahrenheit-sized degrees',
			icon: { n: 'thermometer', s: '°R' }
		},
		{
			name: 'human body temperature',
			plural: 'human body temperatures',
			f: 310.15,
			off: 0,
			cat: 'practical',
			note: 'Average internal temperature, 37°C',
			icon: { n: 'body-temp' }
		},
		{
			name: "Earth's core",
			plural: "Earth's cores",
			f: 6273.15,
			off: 0,
			cat: 'practical',
			note: 'Estimated temperature at the inner core',
			icon: { n: 'earth-core' }
		},
		{
			name: 'melting iron',
			plural: 'melting irons',
			f: 1811.15,
			off: 0,
			cat: 'practical',
			note: 'Melting point of pure iron, 1538°C',
			icon: { n: 'metal-ingot' }
		},
		{
			name: 'melting lead',
			plural: 'melting leads',
			f: 600.65,
			off: 0,
			cat: 'practical',
			note: 'Melting point of pure lead, 327.5°C',
			icon: { n: 'molten-blob' }
		},
		{
			name: "the Sun's surface",
			plural: "the Sun's surfaces",
			f: 5778,
			off: 0,
			cat: 'practical',
			note: 'Photosphere effective temperature',
			icon: { n: 'sun-surface' }
		},
		{
			name: 'frying oil',
			plural: 'frying oils',
			f: 453.15,
			off: 0,
			cat: 'practical',
			note: 'Typical deep-frying temperature, 180°C',
			icon: { n: 'frying-pan' }
		}
	],
	amount: [
		{ name: 'unit', plural: 'units', f: 1, cat: 'si', icon: { n: 'mole', s: '1' } },
		{
			name: "Avogadro's number",
			plural: "Avogadro's numbers",
			f: 6.02214076e23,
			cat: 'si',
			note: 'Entities in one mole of substance',
			icon: { n: 'mole', s: 'Nₐ' }
		},
		{
			name: 'dozen',
			plural: 'dozens',
			f: 12,
			cat: 'practical',
			note: 'Twelve elementary entities',
			icon: { n: 'dozen-dots' }
		},
		{
			name: 'human population',
			plural: 'human populations',
			f: 8e9,
			cat: 'practical',
			note: "Roughly the world's population",
			icon: { n: 'population' }
		},
		{
			name: 'grains of sand on a beach',
			plural: 'grains of sand on a beach',
			f: 7.5e18,
			cat: 'practical',
			note: 'Rough estimate for a large beach',
			icon: { n: 'sand-dune' }
		},
		{
			name: 'stars in the observable universe',
			plural: 'stars in the observable universe',
			f: 1e24,
			cat: 'practical',
			note: 'A common cosmological estimate',
			icon: { n: 'star' }
		}
	],
	luminous: [
		{ name: 'kilocandela', plural: 'kilocandela', f: 1000, cat: 'si', icon: { n: 'candela', s: 'kcd' } },
		{ name: 'candela', plural: 'candela', f: 1, cat: 'si', icon: { n: 'candela', s: 'cd' } },
		{
			name: 'millicandela',
			plural: 'millicandela',
			f: 0.001,
			cat: 'si',
			icon: { n: 'candela', s: 'mcd' }
		},
		{
			name: 'candlepower',
			plural: 'candlepower',
			f: 1.02,
			cat: 'customary',
			note: 'Old imperial standard candle',
			icon: { n: 'candela', s: 'cp' }
		},
		{
			name: 'candle flame',
			plural: 'candle flames',
			f: 1,
			cat: 'practical',
			note: 'Light output of a single candle flame',
			icon: { n: 'candle-flame' }
		},
		{
			name: 'incandescent bulb',
			plural: 'incandescent bulbs',
			f: 70,
			cat: 'practical',
			note: 'Typical 60 W household bulb',
			icon: { n: 'light-bulb' }
		},
		{
			name: 'car headlight',
			plural: 'car headlights',
			f: 75000,
			cat: 'practical',
			note: 'High-beam, at legal maximum intensity',
			icon: { n: 'car-headlight' }
		},
		{
			name: 'lighthouse beacon',
			plural: 'lighthouse beacons',
			f: 1000000,
			cat: 'practical',
			note: 'Modern high-intensity coastal light',
			icon: { n: 'lighthouse' }
		}
	]
};

export function quantityById(id: string): QuantityInfo | undefined {
	return QUANTITIES.find((q) => q.id === id);
}

export function unitByName(quantityId: string, name: string): Unit | undefined {
	return UNITS[quantityId]?.find((u) => u.name === name);
}

/** Converts a value expressed in `u` into the quantity's base unit (affine: handles temperature offsets). */
export function toBase(n: number, u: Unit): number {
	return (n + (u.off ?? 0)) * u.f;
}

/** Converts a base-unit value into `u` (inverse of toBase). */
export function fromBase(baseValue: number, u: Unit): number {
	return baseValue / u.f - (u.off ?? 0);
}
