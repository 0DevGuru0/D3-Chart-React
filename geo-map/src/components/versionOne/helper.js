import * as d3 from 'd3'

export const margin = {
	left: 0,
	right: 20,
	top: 200,
	bottom: 10,
}
export const height = 1000 - margin.top - margin.bottom
export const width = 1000 - margin.left - margin.right

const domainThreshold = [
	10000,
	100000,
	500000,
	1000000,
	5000000,
	10000000,
	50000000,
	100000000,
	500000000,
	1500000000,
]

// Scale_1
// const colorThreshold = d3.quantize(
// 	d3.interpolateHcl('yellow', 'red'),
// 	domainThreshold.length
// )

// Scale_2
var sequentialScale = d3.scaleSequentialPow()
const colorThreshold = d3.quantize(
	sequentialScale.interpolator(d3.interpolateYlOrRd),
	domainThreshold.length
)

//Scale_3
// const colorThreshold = [
// 	'rgb(23,251,255)',
// 	'rgb(222,235,247)',
// 	'rgb(198,219,239)',
// 	'rgb(158,202,225)',
// 	'rgb(107,174,214)',
// 	'rgb(66,146,198)',
// 	'rgb(33,113,181)',
// 	'rgb(8,81,156)',
// 	'rgb(8,48,107)',
// 	'rgb(3,19,43)',
// ]

export const color = d3
	.scaleThreshold()
	.domain(domainThreshold)
	.range(colorThreshold)

export const projection = d3.geoMercator().scale(150)

export const path = d3.geoPath().projection(projection)
