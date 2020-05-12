/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import dataProvision from './data/'
import {
	margin,
	width,
	height,
	nodesRadius,
	weightScale,
	colorScale,
	forceSimulation,
	dragFunc,
} from './helpers'
import Header from '../util/version'
const VersionOne = props => {
	let data = dataProvision()

	useEffect(() => {
		console.log(data)

		// links Draw
		let links = d3
			.select('svg g')
			.append('g')
			.classed(classes.links, true)
			.selectAll('line')
			.data(data.links)

		let linksEnter = links
			.enter()
			.append('line')
			.attr('stroke-width', d => weightScale(d.weight))

		// nodes Draw
		let circle = d3
			.select('svg g')
			.append('g')
			.classed(classes.nodes, true)
			.selectAll('circle')
			.data(data.nodes)

		let circleEnter = circle
			.enter()
			.append('circle')
			.attr('r', nodesRadius)
			.attr('fill', d => colorScale(d.Group))
			.call(dragFunc(forceSimulation))

		forceSimulation.nodes(data.nodes).on('tick', () => {
			linksEnter
				.attr('x1', d => d.source.x)
				.attr('x2', d => d.target.x)
				.attr('y1', d => d.source.y)
				.attr('y2', d => d.target.y)
			circleEnter.attr('cx', d => d.x).attr('cy', d => d.y)
		})
		forceSimulation.force('link').links(data.links)
	}, [])

	return (
		<>
			<Header>Version 1</Header>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.l},${margin.t})`}></g>
			</svg>
		</>
	)
}
export default VersionOne
