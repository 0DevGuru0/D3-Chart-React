import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import classes from './styles.module.scss'
import Header from '../util/version'
import {
	width,
	height,
	pixels,
	forceSimulation,
	colorScale,
	mouseNode,
	alterForce,
} from './helpers'

const VersionThree = () => {
	const toggle = useRef(true)
	useEffect(() => {
		let rects = d3
			.select('svg g')
			.selectAll('circle')
			.data(pixels)
		let rectsEnter = rects
			.enter()
			.append('circle')
			.attr('r', d => d.rTarget)

		forceSimulation.on('tick', ticked)
		function ticked(d) {
			rectsEnter
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)
				.attr('fill', d => colorScale(d.x))
		}

		d3.select('svg').on('mousemove', function () {
			var p = d3.mouse(this)
			mouseNode.xTarget = p[0]
			mouseNode.yTarget = p[1]
			alterForce().restart()
		})
	}, [])
	const clickHandler = () => {
		console.log(toggle.current)
		if (toggle.current) {
			forceSimulation.force(
				'charge',
				d3.forceManyBody().strength(-80)
			)
			toggle.current = false
		} else {
			console.log('ok')
			alterForce().alpha(1)
			toggle.current = true
		}
	}
	return (
		<>
			<Header>VersionThree</Header>
			<svg width={width} height={height}>
				<g className={classes.rect}></g>
			</svg>
			{/* <button className={classes.reset} onClick={clickHandler}>
				Reset
			</button> */}
		</>
	)
}
export default VersionThree
