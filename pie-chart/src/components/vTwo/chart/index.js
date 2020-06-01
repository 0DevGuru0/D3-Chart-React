/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import * as g from './helpers'
import classes from './styles.module.scss'
import * as d3 from 'd3'

const drawSlices = ({ pie: data, columns }) => {
	let slices = d3
		.select(`.${classes.chart}`)
		.selectAll(`g.${classes.slices}`)
		.data(data, d => d.index)

	let slicesEnter = slices
		.enter()
		.append('g')
		.classed(classes.slices, true)
		.merge(slices)

	slicesEnter
		.append('text')
		.classed(classes.label, true)
		.attr('text-anchor', d => {
			d.midPt = (d.startAngle + d.endAngle) / 2
			return d.midPt < Math.PI ? 'start' : 'end'
		})
		.attr('dy', d => {
			let dy = 0.35
			if (d.midPt < 0.5 * Math.PI || d.midPt > 1.5 * Math.PI)
				dy -= 3
			return dy
		})
		.attr(
			'x',
			d => d3.pointRadial(d.midPt, g.radius + g.labelOffset)[0]
		)
		.attr(
			'y',
			d => d3.pointRadial(d.midPt, g.radius + g.labelOffset)[1]
		)
		.text(d => {
			let { minExperiment, maxExperiment } = d.data.value
			return (
				`${columns[1]}${d.data.key},${columns[0]}` +
				(minExperiment === maxExperiment
					? `${minExperiment}`
					: 's ' + minExperiment + ' - ' + maxExperiment)
			)
		})
	return slicesEnter
}

const drawSegment = (sliceEnter, { sigScale, columns }) => {
	let segment = sliceEnter
		.selectAll(`g.${classes.segment}`)
		.data(d => d.children)

	let segmentEnter = segment
		.enter()
		.append('g')
		.classed(classes.segment, true)

	let path = segmentEnter
		.append('path')
		.attr('d', d => {
			let radius =
				sigScale(d.data[columns[2]]) * g.radius * 0.5 +
				0.6 * g.radius

			return g.sliceArc.outerRadius(radius)(d)
		})
		.attr('fill', (d, i) => {
			const color = d3.rgb(g.colorSchema[d.data[columns[1]]])
			return color.brighter(i / g.current[columns[1]])
		})
		// .on('mouseover', function (d) {
		// 	document.querySelector()
		// })
		// .on('mouseout', d => {
		// 	console.log(d)
		// })
		.append('title')
		.text(d =>
			columns.map(e => e + ': ' + d.data[e]).join(', ')
		)
}

let draw = data => {
	d3
		.select('svg')
		.selectAll('g .' + classes.slices)
		.remove()
	let sliceEnter = drawSlices(data)
	drawSegment(sliceEnter, data)
}

export default function VersionTwo({ data }) {
	useEffect(() => {
		if (data) draw(data)
	}, [data])

	return (
		<div className={classes.container}>
			<svg width={g.width} height={g.height}>
				<g
					transform={`translate(${g.width / 2},${g.height / 2})`}
					className={classes.chart}></g>
			</svg>
		</div>
	)
}
