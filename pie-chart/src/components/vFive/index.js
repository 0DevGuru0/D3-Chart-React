import React, { useEffect } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'

export default function Chart() {
	useEffect(() => {
		let svg = d3
			.select('.' + classes.chart)
			.selectAll('path')
			.data(['cyan', 'magenta', 'yellow'])
		let path = svg
			.enter()
			.append('path')
			.attr('stroke', d => d)
			.style('mix-blend-mode', 'darken')
			.datum((d, i) => {
				return d3
					.lineRadial()
					.curve(d3.curveLinearClosed)
					.angle(a => a)
					.radius(a => {
						var t = d3.now() / 1000
						return (
							200 +
							Math.cos(a * 8 - (i * 2 * Math.PI) / 3 + t) *
								Math.pow((1 + Math.cos(a - t)) / 2, 3) *
								32
						)
					})
			})
		d3.timer(() => {
			path.attr('d', d => d(g.angles))
		})
	}, [])
	return (
		<>
			<svg width={g.width} height={g.height}>
				<g
					className={classes.chart}
					transform={`translate(${g.width / 2},${
						g.height / 2
					})`}></g>
			</svg>
		</>
	)
}
