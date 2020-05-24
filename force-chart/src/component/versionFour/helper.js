import * as d3 from 'd3'

export let width = 900
export let height = 400

// scales
export let rScale = d3
	.scalePow()
	.exponent(0.5)
	.range([2, 50])
export let xScale = d3.scaleBand().range([0, width])
export let xScale2 = d3.scaleBand().range([0, width])
// let yScale = d3.scaleBand().range([50, height])

export let colorScale = d3.scaleOrdinal(d3.schemeCategory10)
export let forceSimulation = d3
	.forceSimulation()
	.force(
		'collide',
		d3.forceCollide().radius(d => rScale(d.value.budget) + 1)
	)
	.force('x', d3.forceX(width / 2))
	.force('y', d3.forceY(height / 2))
