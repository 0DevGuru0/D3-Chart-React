import * as d3 from 'd3'
import classes from './styles.module.scss'
export const width = 960
export const height = 600

// rAxis
export const chartRadius = height / 2.4 - 50
export const arcMinRadius = 5
export const arcPadding = 12
export const numArcs = data =>
	data.map(d => d.Decade).length

export const arcWidth = data =>
	(chartRadius - arcMinRadius - numArcs(data) * arcPadding) /
	numArcs(data)

export const getInnerRadius = (index, data) =>
	arcMinRadius +
	(numArcs(data) - (index + 1)) *
		(arcWidth(data) + arcPadding)

export const getOuterRadius = (index, data) =>
	getInnerRadius(index, data) + arcWidth(data)

export const labelPadding = -5

// --> aAxis
export const numTicks = 15
export const scale = (data, kind) =>
	d3
		.scaleLinear()
		.domain([0, d3.max(data, d => +d[kind] * 1.1)])
		.range([0, 2 * Math.PI])

export const ticks = (data, kind) =>
	scale(data, kind).ticks(numTicks).slice(0, -1)

export const rad2deg = angle => (angle * 180) / Math.PI

export const color = kind =>
	kind === 'AdjustedRevenue'
		? d3.interpolate('#385c4d', '#366c3d')
		: d3.interpolate('#8FC0A9', '#9FC5A0')

export const arc = (data, kind) =>
	d3
		.arc()
		.innerRadius((d, i) => getInnerRadius(i, data))
		.outerRadius((d, i) => getOuterRadius(i, data))
		.startAngle(0)
		.endAngle((d, i) => scale(data, kind)(d))

export const attrTween = (d, data, i, kind) => {
	const interpolate = d3.interpolate(0, +d[kind])
	return t => arc(data, kind)(interpolate(t), i)
}

export const toolTip = d3
	.select('body')
	.append('div')
	.classed(classes.toolTip, true)
