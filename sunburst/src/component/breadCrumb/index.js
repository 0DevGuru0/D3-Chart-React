/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as d3 from 'd3'
// import classes from './styles.module.scss'

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
let b = {
	w: 75,
	h: 30,
	s: 3,
	t: 10,
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
	let points = []
	points.push('0,0')
	points.push(b.w + ',0')
	points.push(b.w + b.t + ',' + b.h / 2)
	points.push(b.w + ',' + b.h)
	points.push('0,' + b.h)
	if (i > 0) {
		// Leftmost breadcrumb; don't include 6th vertex.
		points.push(b.t + ',' + b.h / 2)
	}
	return points.join(' ')
}

// Update the breadcrumb trail to show the current sequence and percentage.
const Breadcrumb = props => {
	let width = props.width
	let height = 50
	useEffect(() => {
		if (props.data.update) {
			let trail = d3
				.select(`#trail`)
				.selectAll('g')
				.data(props.data.nodeArray, d => d.data.name + d.data.depth)
			trail.exit().remove()

			let entering = trail.enter().append('g')
			entering
				.append('polygon')
				.attr('points', breadcrumbPoints)
				.style('fill', d => props.colors[d.data.name])

			entering
				.append('text')
				.attr('x', (b.w + b.t) / 2)
				.attr('y', b.h / 2)
				.attr('dy', '0.35em')
				.attr('text-anchor', 'middle')
				.attr('fill', '#fff')
				.style('text-transform', 'capitalize')
				.text(d => d.data.name)

			entering
				.merge(trail)
				.attr('transform', (d, i) => `translate(${i * (b.w + b.s)},0)`)

			// Now move and update the percentage at the end.
			d3
				.select(`#trail #endLabel`)
				.attr('x', (props.data.nodeArray.length + 0.5) * (b.w + b.s))
				.attr('y', b.h / 2)
				.attr('dy', '0.35em')
				.attr('text-anchor', 'middle')
				.text(props.data.percentage)

			// Make the breadcrumb trail visible, if it's hidden.
			d3.select('#trail').style('visibility', '')
		}
	}, [props.data])
	return (
		<svg width={width} height={height} id='trail'>
			<text id='endLabel' style={{ fill: '#fff' }}></text>
		</svg>
	)
}
export default Breadcrumb
