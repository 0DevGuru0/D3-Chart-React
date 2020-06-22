import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'

export default function RadialChart(data, kind) {
	let svg = d3.select('.' + classes.chart)

	let radialAxis = svg
		.append('g')
		.classed(classes.rAxis, true)
		.selectAll('g')
		.data(data)
		.enter()
		.append('g')

	radialAxis
		.append('circle')
		.classed(classes.circles, true)
		.attr(
			'r',
			(d, i) => g.getOuterRadius(i, data) + g.arcPadding
		)

	radialAxis
		.append('text')
		.classed(classes.yearText, true)
		.attr('x', g.labelPadding)

		.attr(
			'y',
			(d, i) => -g.getOuterRadius(i, data) + g.arcPadding
		)

		.text(d => d.Decade)

	let aRadialAxis = svg
		.append('g')
		.classed(classes.aAxis, true)
		.selectAll('g')
		.data(g.ticks(data, kind))
		.enter()
		.append('g')
		.attr(
			'transform',
			d =>
				'rotate(' +
				(g.rad2deg(g.scale(data, kind)(d)) - 90) +
				')'
		)

	aRadialAxis
		.append('line')
		.classed(classes.spreadLine, true)
		.attr('x2', g.chartRadius)

	aRadialAxis
		.append('text')
		.classed(classes.revenueText, true)
		.attr('x', g.chartRadius + 10)
		.attr(
			'transform',
			d =>
				'rotate(' +
				(90 - g.rad2deg(g.scale(data, kind)(d))) +
				',' +
				(g.chartRadius + 15) +
				',0)'
		)
		.attr('text-anchor', d =>
			g.scale(data, kind)(d) > Math.PI ? 'end' : null
		)
		.text(d => d3.format(',')(d) + '$')

	let arcs = svg
		.append('g')
		.classed(classes.data, true)
		.selectAll('path')
		.data(data)
		.enter()
		.append('path')
		.classed(classes.arcs, true)
		.attr('fill', (d, i) => g.color(kind)(i))

	arcs.on('mouseover', showTooltip)
	arcs.on('mouseout', hideTooltip)

	arcs
		.transition()
		.delay((d, i) => i * 200)
		.duration(1000)
		.attrTween('d', (d, i) => g.attrTween(d, data, i, kind))

	function showTooltip(d) {
		g.toolTip
			.style('left', d3.event.pageX + 10 + 'px')
			.style('top', d3.event.pageY - 10 + 'px')
			.style('display', 'block')
			.html(
				'$' +
					d3.format(',')(+d[kind]) +
					'<br>' +
					' Decline since 1950: ' +
					Math.round(100 - (d[kind] / data[0][kind]) * 100) +
					'%'
			)
	}

	function hideTooltip(d) {
		g.toolTip.style('display', 'none')
	}
}
