import {
	drag,
	event,
	scaleOrdinal,
	forceSimulation,
	forceCollide,
	forceManyBody,
	forceCenter,
	forceY,
	forceX,
} from 'd3'

export let width = window.innerWidth
export let height = window.innerHeight
export var colorScale = scaleOrdinal([
	'#66c2a5',
	'#fc8d62',
	'#8da0cb',
	'#e78ac3',
	'#a6d854',
	'#ffd92f',
	'#e5c494',
	'#b3b3b3',
])

let sizeDivisor = 100
export let types = d => {
	d.gdp = +d.gdp
	d.size = +d.gdp / sizeDivisor
	d.size < 3 ? (d.radius = 3) : (d.radius = d.size)
	return d
}

// -------Force Simulation
export let _forceSimulation = forceSimulation()
	.force(
		'collide',
		forceCollide().radius(d => d.radius)
	)
	.force(
		'x',
		forceX()
			.strength(0.1)
			.x(width * 0.5)
	)
	.force(
		'y',
		forceY()
			.strength(0.1)
			.y(height * 0.5)
	)
	.force('center', forceCenter(width / 2, height / 2))
	.force('charge', forceManyBody().strength(-15))

// -------Drag Utility
export function dragFunc(forceSimulate) {
	function dragStarted(d) {
		if (!event.active) forceSimulate.alphaTarget(0.3).restart()
		d.fx = d.x
		d.fy = d.y
	}

	function dragged(d) {
		d.fx = event.x
		d.fy = event.y
	}

	function dragEnded(d) {
		if (!event.active) forceSimulate.alphaTarget(0)
		d.fx = null
		d.fy = null
	}

	return drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded)
}
