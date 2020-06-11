/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'

const Legend = ({ totalFreq }) => {
	useEffect(() => {
		if (totalFreq) {
			console.log('Legend')
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

			//Update Section
			let rows_up = d3
				.select('.' + classes.legend + ' tbody')
				.selectAll('tr')
				.data(totalFreq)

			rows_up
				.select('.' + classes.legendFreq)
				.text(d => d3.format(',')(d.freq))

			rows_up
				.select('.' + classes.getLegendPrec)
				.text(d => g.getLegendPrec(d, totalFreq))
		}
	}, [totalFreq])
	return (
		<>
			<table className={classes.legend}>
				<tbody></tbody>
			</table>
		</>
	)
}

export default React.memo(Legend)
