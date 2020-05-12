import React, { useEffect } from 'react'
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
	x0,
	dx,
	baseRadius,
	collisionStrength,
} from './helpers'
const VersionThree = () => {
	useEffect(() => {
		let rects = d3.select('svg g').selectAll('circle').data(pixels)
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
		let x0 = 0,
			fps = 100,
			dx = 150 / fps, //speed
			baseRadius = 50

		d3.timer(function () {
			x0 += dx
			if (x0 > width / 2) x0 = 0
			var x = width * Math.sin((x0 / width) * Math.PI * 2)
			mouseNode.xTarget = x
			mouseNode.rTarget =
				(baseRadius / 2) * Math.abs(Math.cos((x0 / width) * Math.PI * 6)) +
				10 +
				(baseRadius / 4) * Math.abs(Math.sin((x0 / width) * Math.PI * 7))
			forceSimulation
				.force(
					'x',
					d3
						.forceX(function (d) {
							return d.xTarget
						})
						.strength(collisionStrength)
				)
				.force(
					'y',
					d3
						.forceY(function (d) {
							return d.yTarget
						})
						.strength(collisionStrength)
				)
				.force(
					'collide',
					d3.forceCollide().radius(function (d) {
						return d.rTarget
					})
				)
				.alpha(1)
		})
	}, [])
	return (
		<>
			<Header>VersionThree</Header>
			<svg width={width} height={height}>
				<g className={classes.rect}></g>
			</svg>
		</>
	)
}
export default VersionThree
