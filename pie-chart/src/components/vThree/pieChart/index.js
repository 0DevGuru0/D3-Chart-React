/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useMemo } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'
import preData from '../data/data.json'
import DataProvide from '../data/index'

const PieChart = ({ totalFreq, setStateFreq }) => {
	let pathData = useRef([])
	useEffect(() => {
		if (totalFreq) {
			console.log('pieChart')
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
				.on('mouseover', mouseover)
				.on('mouseout', mouseout)
				.merge(pie)
				.transition()
				.duration(1000)
				.attrTween('d', (d, idx) => {
					let i = d3.interpolate(pathData.current[idx], d)
					pathData.current[idx] = i(1)
					return t => g.arc(i(t))
				})
		}
	}, [totalFreq])

	const { mouseover, mouseout } = useMemo(() => {
		function mouseover(d) {
			const freq = preData.map(el => [
				el.freq[d.data.type],
				el.State,
			])
			setStateFreq(freq)
		}
		function mouseout() {
			let { stateFreq } = DataProvide()
			setStateFreq(stateFreq)
		}
		return { mouseover, mouseout }
	}, [])

	return (
		<div className={classes.wrapper}>
			<svg width={g.width} height={g.height}>
				<g
					className={classes.chart}
					transform={`translate(${g.width / 2},${
						g.height / 2
					})`}></g>
			</svg>
		</div>
	)
}
export default React.memo(PieChart)
