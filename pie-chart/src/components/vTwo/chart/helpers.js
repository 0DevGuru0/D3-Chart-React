import { arc } from 'd3'

export const width = window.innerWidth
export const height = window.innerHeight - 100
export const radius = Math.min(width, height) / 2 - 100
export const labelOffset = 10
export const colorSchema = [
	'#fff',
	'#e6194b',
	'#3cb44b',
	'#ffe119',
	'#4363d8',
	'#f58231',
	'#911eb4',
	'#46f0f0',
	'#f032e6',
	'#bcf60c',
	'#fabebe',
	'#008080',
	'#e6beff',
	'#9a6324',
	'#fffac8',
	'#800000',
	'#aaffc3',
	'#808000',
	'#ffd8b1',
	'#000075',
	'#808080',
]
export const sliceArc = arc().innerRadius(0).cornerRadius(3)
export const current = {
	Run: 12,
	Experiment: 6,
}
