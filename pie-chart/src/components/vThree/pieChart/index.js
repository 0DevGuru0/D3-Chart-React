import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'

export default React.memo(function PieChart({
	data,
	setData,
}) {
	let pathData = useRef([])
	useEffect(() => {
		if (data) {
			console.log('pieChart')
			const { totalFreq } = data
			let pie = d3
				.select('.' + classes.chart)
				.selectAll('path')
				.data(g.pie(totalFreq))

			//PieEnter
			pie
				.enter()
				.append('path')
				.each(d => pathData.current.push(d))
				.attr('fill', d => g.color(d.data.type))
				.merge(pie)
				.transition()
				.duration(1000)
				.attrTween('d', (d, idx) => {
					let i = d3.interpolate(pathData.current[idx], d)
					pathData.current[idx] = i(1)
					return t => g.arc(i(t))
				})
		}
	}, [data])
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
})
