import * as d3 from 'd3'

export let m = {
	l: 70,
	r: 60,
	t: 20,
	b: 50,
}
export let height = 650 - m.t - m.b,
	width = 1000 - m.l - m.r

export let area = d3
	.scaleLinear()
	.range([25 * Math.PI, 1500 * Math.PI])

export let xScale = d3
	.scaleLog()
	.base(10)
	.range([0, width])
	.domain([142, 150000])

export let yScale = d3
	.scaleLinear()
	.range([height, 0])
	.domain([0, 90])

export let colorScale = d3.scaleOrdinal(d3.schemeCategory10)

export let xAxis = d3
	.axisBottom(xScale)
	.tickValues([400, 4000, 40000])
	.tickFormat(d3.format('$'))
	.tickSize(15)

export let yAxis = d3
	.axisLeft(yScale)
	.tickFormat(d => +d)
	.tickSize(15)
