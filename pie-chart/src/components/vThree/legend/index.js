/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'
export default React.memo(function Legend(props) {
	useEffect(() => {
		if (props.data) {
			let { totalFreq } = props.data
			let rows = d3
				.select('.' + classes.legend + ' tbody')
				.selectAll('tr')
				.data(totalFreq)

			let row = rows
				.enter()
				.append('tr')
				.classed(classes.rows, true)
			// rect
			row
				.append('td')
				.append('svg')
				.attr('width', 16)
				.attr('height', 16)
				.append('rect')
				.attr('width', 16)
				.attr('height', 16)
				.attr('fill', d => g.color(d.type))
			//Type
			row
				.append('td')
				.classed(classes.legendType, true)
				.text(d => d.type)
			//TotalFreq
			row
				.append('td')
				.classed(classes.legendFreq, true)
				.text(d => d3.format(',')(d.freq))
			// Precision
			row
				.append('td')
				.classed(classes.legendPerc, true)
				.text(d => g.getLegendPrec(d, totalFreq))
		}
		return () => {
			if (props.data) {
				let { totalFreq } = props.data

				let l = d3
					.select('.' + classes.legend + ' tbody')
					.selectAll('tr')
					.data(totalFreq)

				l.select('.' + classes.getLegendPrec).text(d =>
					g.getLegendPrec(d, totalFreq)
				)
			}
		}
	}, [props.data])
	return (
		<>
			<table className={classes.legend}>
				<tbody></tbody>
			</table>
		</>
	)
})
