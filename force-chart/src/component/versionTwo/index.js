/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as d3 from 'd3'
import classes from './styles.module.scss'
import _data from './data/data.csv'
import {
	types,
	colorScale,
	_forceSimulation,
	dragFunc,
	height,
	width,
} from './helper'
import Header from '../util/version'
const VersionTwo = props => {
	useEffect(() => {
		d3.csv(_data, types).then(graph => {
			let data = graph.sort((a, b) => b.value - a.value)
			console.log(data)
			let nodes = d3.select(`svg .${classes.nodes}`).selectAll('circle').data(data)
			let nodeEnter = nodes
				.enter()
				.append('circle')
				.attr('fill', d => colorScale(d.continent))
				.attr('r', d => d.radius)
				.call(dragFunc(_forceSimulation))
			_forceSimulation.nodes(data).on('tick', () => {
				nodeEnter.attr('cx', d => d.x).attr('cy', d => d.y)
			})
		})
	}, [])
	return (
		<>
			<Header>VersionTwo</Header>
			<svg width={width} height={height} className={classes.svg}>
				<g className={classes.nodes}></g>
			</svg>
		</>
	)
}
export default VersionTwo
