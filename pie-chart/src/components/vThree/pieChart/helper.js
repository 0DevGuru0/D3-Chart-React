import * as d3 from 'd3'

export let width = 250
export let height = 250
export const pieRadius = Math.min(width, height) / 2
export const pie = d3
	.pie()
	.sort(null)
	.value(d => d.freq)
export const arc = d3
	.arc()
	.innerRadius(0)
	.outerRadius(pieRadius - 10)
	.cornerRadius(10)
export const color = d3.scaleOrdinal(d3.schemeCategory10)
