import * as d3 from 'd3'

// -------scaffold
export let margin = { l: 10, r: 10, t: 10, b: 10 }
export let width = 700 - margin.l - margin.r
export let height = 700 - margin.b - margin.t

export let nodesRadius = 10

// -------Scales
export let weightScale = d3
	.scaleLinear()
	.domain([0, 30])
	.range(d => d3.extent(d.weight))
export let colorScale = d3.scaleOrdinal(d3.schemeCategory10)

// -------ForceSimulation
export let forceSimulation = d3
	.forceSimulation()
	.force(
		'link',
		d3.forceLink().id(d => d.id)
	)
	.force('charge', d3.forceManyBody().strength(-80))
	.force('collide', d3.forceCollide().radius(nodesRadius))
	.force('center', d3.forceCenter(width / 2, height / 2))

// -------Drag Utility
export function dragFunc(forceSimulate) {
	function dragStarted(d) {
		if (!d3.event.active) forceSimulate.alphaTarget(0.3).restart()
		d.fx = d.x
		d.fy = d.y
	}

	function dragged(d) {
		d.fx = d3.event.x
		d.fy = d3.event.y
	}

	function dragEnded(d) {
		if (!d3.event.active) forceSimulate.alphaTarget(0)
		d.fx = null
		d.fy = null
	}

	return d3
		.drag()
		.on('start', dragStarted)
		.on('drag', dragged)
		.on('end', dragEnded)
}
