import React, { useEffect } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'

export default function PieChart() {
	useEffect(() => {
		let arc = d3
			.select('.' + classes.chart)
			.selectAll('.arc')
			.data(g.arcs(g.data0, g.data1))
		arc
			.enter()
			.append('g')
			.classed(classes.arc, true)
			.attr(
				'transform',
				'translate(' + g.width / 2 + ',' + g.height / 2 + ')'
			)
			.append('path')
			.classed(classes.path, true)
			.attr('fill', function (d, i) {
				return g.color(i)
			})
			.attr('d', g.arc)
		transition(1)

		function transition(state) {
			let path = d3
				.selectAll('.' + classes.path)
				.data(
					state
						? g.arcs(g.data0, g.data1)
						: g.arcs(g.data1, g.data0)
				)
			console.log(path)
			// Wedges split into two rings.
			let t0 = path
				.transition()
				.duration(1000)
				.attrTween(
					'd',
					g.tweenArc((d, i) => {
						return {
							innerRadius:
								i & 1
									? g.innerRadius
									: (g.innerRadius + g.outerRadius) / 2,
							outerRadius:
								i & 1
									? (g.innerRadius + g.outerRadius) / 2
									: g.innerRadius,
						}
					})
				)

			// Wedges translate to be centered on their final position.
			// let t1 = t0
			// 	.transition()
			// 	.duration(1000)
			// 	.attrTween(
			// 		'd',
			// 		tweenArc((d, i) => {
			// 			let a0 = d.next.startAngle + d.next.endAngle
			// 			let a1 = d.startAngle - d.endAngle
			// 			return {
			// 				startAngle: (a0 + a1) / 2,
			// 				endAngle: (a0 - a1) / 2,
			// 			}
			// 		})
			// 	)
			// Wedges then update their values, changing size.
			// let t2 = t1
			// 	.transition()
			// 	.duration(1000)
			// 	.attrTween(
			// 		'd',
			// 		tweenArc((d, i) => {
			// 			return {
			// 				startAngle: d.next.startAngle,
			// 				endAngle: d.next.endAngle,
			// 			}
			// 		})
			// 	)
			// Wedges reunite into a single ring.
			// t2
			// 	.transition()
			// 	.duration(1000)
			// 	.attrTween(
			// 		'd',
			// 		tweenArc((d, i) => {
			// 			return {
			// 				innerRadius: g.innerRadius,
			// 				outerRadius: g.outerRadius,
			// 			}
			// 		})
			// 	)

			// setTimeout(function () {
			// 	transition(!state)
			// }, 5000)
		}
	}, [])
	return (
		<>
			<svg
				width={g.width}
				height={g.height}
				className={classes.chart}></svg>
		</>
	)
}
