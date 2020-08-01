import * as d3 from 'd3'
import { rasterizeText } from './plugin/fuzzyText'

let text = 'MOHAMMAD FALLAH'

export let width = window.innerWidth,
	height = 500,
	radius = 2,
	collisionStrength = 0.1

let options = {
	width: width,
	height: height,
	spacing: 10,
	fontSize: '250px',
	fontFamily: 'Ubuntu',
}

export let colorScale = d3
	.scaleSequential(d3.interpolateBlues)
	.domain([0, width])

export let pixels = rasterizeText(text, options).map(
	function (d) {
		let x = Math.random() * width
		return {
			x: x,
			y: Math.random() * height,
			xTarget: d[0],
			yTarget: d[1],
			rTarget:
				radius + (Math.abs(width / 2 - x) / width) * 2 * 2,
		}
	}
)

// Wrecking ball node (associated with mouse movement)
export let x0 = 0,
	y0 = height / 2,
	fps = 60,
	dx = 150 / fps, //speed
	baseRadius = 50

export var mouseNode = {
	x: x0,
	y: y0,
	xTarget: width + 100,
	yTarget: height / 2,
	rTarget: baseRadius,
}
// Combine mouse node with pixel nodes
var nodes = [mouseNode].concat(pixels)

export let forceSimulation = d3
	.forceSimulation(nodes)
	.velocityDecay(0.2)
	.force(
		'x',
		d3.forceX(d => d.xTarget).strength(collisionStrength)
	)
	.force(
		'y',
		d3.forceY(d => d.yTarget).strength(collisionStrength)
	)
	.force(
		'collide',
		d3.forceCollide().radius(d => d.rTarget)
	)

export const alterForce = () =>
	forceSimulation
		.force(
			'x',
			d3.forceX(d => d.xTarget).strength(collisionStrength)
		)
		.force(
			'y',
			d3.forceY(d => d.yTarget).strength(collisionStrength)
		)
		.force(
			'collide',
			d3.forceCollide().radius(d => d.rTarget)
		)
		.alpha(1)

export const automatic = () => {
	let x0 = 0,
		fps = 100,
		dx = 150 / fps, //speed
		baseRadius = 50
	d3.timer(function () {
		x0 += dx
		if (x0 > width / 2) x0 = 0
		var x = width * Math.sin((x0 / width) * Math.PI * 2)
		mouseNode.xTarget = x
		mouseNode.rTarget =
			(baseRadius / 2) *
				Math.abs(Math.cos((x0 / width) * Math.PI * 6)) +
			10 +
			(baseRadius / 4) *
				Math.abs(Math.sin((x0 / width) * Math.PI * 7))
		alterForce()
	})
}
