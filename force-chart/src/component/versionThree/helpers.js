import * as d3 from 'd3'
let text = 'AFSAN'

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

export let pixels = rasterizeText(text, options).map(function (d) {
	let x = Math.random() * width
	return {
		x: x,
		y: Math.random() * height,
		xTarget: d[0],
		yTarget: d[1],
		rTarget: radius + (Math.abs(width / 2 - x) / width) * 2 * 2,
	}
})

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
	.force('x', d3.forceX(d => d.xTarget).strength(collisionStrength))
	.force('y', d3.forceY(d => d.yTarget).strength(collisionStrength))
	.force(
		'collide',
		d3.forceCollide().radius(d => d.rTarget)
	)
	.alpha(1)

// Convert text into grid of points that lay on top of the text
// Inspired by FizzyText. See http://bl.ocks.org/tophtucker/978513bc74d0b32d3795
function rasterizeText(text, options) {
	let o = options || {}
	let fontSize = o.fontSize || '200px',
		fontWeight = o.fontWeight || '600',
		fontFamily = o.fontFamily || 'sans-serif',
		textAlign = o.center || 'center',
		textBaseline = o.textBaseline || 'middle',
		spacing = o.spacing || 10,
		width = o.width || 960,
		height = o.height || 500,
		x = o.x || width / 2,
		y = o.y || height / 2

	let canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height

	let context = canvas.getContext('2d')

	context.font = [fontWeight, fontSize, fontFamily].join(' ')
	context.textAlign = textAlign
	context.textBaseline = textBaseline

	let dx = context.measureText(text).width,
		dy = +fontSize.replace('px', ''),
		bBox = [
			[x - dx / 2, y - dy / 2],
			[x + dx / 2, y + dy / 2],
		]

	context.fillText(text, x, y)

	let imageData = context.getImageData(0, 0, width, height)

	let pixels = []
	for (let x = bBox[0][0]; x < bBox[1][0]; x += spacing) {
		for (let y = bBox[0][1]; y < bBox[1][1]; y += spacing) {
			let pixel = getPixel(imageData, x, y)
			if (pixel[3] != 0) pixels.push([x, y])
		}
	}

	return pixels
}

function getPixel(imageData, x, y) {
	let i = 4 * (parseInt(x) + parseInt(y) * imageData.width)
	let d = imageData.data
	return [d[i], d[i + 1], d[i + 2], d[i + 3]]
}
