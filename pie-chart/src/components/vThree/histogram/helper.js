import * as d3 from 'd3'

export let HGDim = {
	t: 60,
	r: 0,
	b: 30,
	l: 0,
}

export let width = 500 - HGDim.l - HGDim.r

export let height = 300 - HGDim.t - HGDim.b

export let x = d3
	.scaleBand()
	.rangeRound([0, width])
	.padding(0.3)

export let y = d3.scaleLinear().range([height, 0])

export let col = d3.scaleOrdinal(d3.schemeCategory10)

export let colorScale = d3.quantize(
	d3.interpolate('green', 'steelblue'),
	10
)

export const xAxis = d3.axisBottom().scale(x).tickPadding(5)

export const t = () =>
	d3.transition().duration(1000).ease(d3.easeBounce)
