/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as d3 from 'd3'

// import classes from './styles.module.scss'

// Dimensions of legend item: width, height, spacing, radius of rounded rect.
let li = {
	w: 75,
	h: 30,
	s: 3,
	r: 3,
}

const Legend = props => {
	useEffect(() => {
		if (props.colors.root) delete props.colors.root
		let g = d3
			.select('#legend svg')
			.selectAll('g')
			.data(d3.entries(props.colors))
			.enter()
			.append('g')
			.attr('transform', (d, i) => `translate(0,${i * (li.h + li.s)})`)
		g.append('rect')
			.attr('rx', li.r)
			.attr('ry', li.r)
			.attr('width', li.w)
			.attr('height', li.h)
			.style('fill', d => d.value)
		g.append('text')
			.attr('x', li.w / 2)
			.attr('y', li.h / 2)
			.attr('dy', '0.35em')
			.attr('text-anchor', 'middle')
			.text(d => d.key)
	}, [])
	const toggleHandler = () => {
		let legend = d3.select('#legend svg')
		legend.style(
			'visibility',
			legend.style('visibility') === 'hidden' ? '' : 'hidden'
		)
	}
	return (
		<div id='legend'>
			<input type='checkbox' id='toggle-legend' onClick={toggleHandler} /> Legend
			<br />
			<svg
				width={li.w}
				height={d3.keys(props.colors).length * (li.h + li.s)}
				style={{ visibility: 'hidden' }}></svg>
		</div>
	)
}
export default Legend
