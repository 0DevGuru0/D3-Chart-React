/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as d3 from 'd3'
import * as g from './helper'
import classes from './styles.module.scss'
import preData from '../data/data.json'
import dataProvide from '../data'
export default function Histogram(props) {
	useEffect(() => {
		if (props.data) {
			console.log('histogram')
			let { stateFreq } = props.data
			g.x.domain(stateFreq.map(d => d[1]))
			g.y.domain([0, d3.max(stateFreq, d => d[0])])

			//x-Axis
			d3
				.select('.' + classes.chart)
				.append('g')
				.classed(classes.barAxis, true)
				.attr('transform', 'translate(0,' + g.height + ')')
				.call(g.xAxis)

			let bar = d3
				.select('.' + classes.chart)
				.selectAll('.' + classes.barGrp)
				.data(stateFreq)

			let barGroup = bar
				.enter()
				.append('g')
				.attr('class', classes.barGrp)

			// Rects
			barGroup
				.append('rect')
				.attr('width', g.x.bandwidth)
				.attr('x', d => g.x(d[1]))
				.attr('height', d => g.height - g.y(d[0]))
				.attr('y', d => g.y(d[0]))
				// .attr('fill', d => g.col(d[1]))
				.attr('fill', (_, i) => g.colorScale[i])
				.on('mouseover', mouseover)
				.on('mouseout', mouseout)

			//BarText
			barGroup
				.append('text')
				.classed(classes.barText, true)
				.attr('text-anchor', 'middle')
				.attr('dy', -2)
				.attr('x', d => g.x(d[1]) + g.x.bandwidth() / 2)
				.attr('y', d => g.y(d[0]))
				.text(d => d3.format('.2s')(d[0]))
			bar.exit().remove()
			function mouseover(d) {
				let state = preData.filter(el => el.State === d[1])[0]
				let totalFreq = d3
					.keys(state.freq)
					.map(v => ({ type: v, freq: state.freq[v] }))
				delete props.data.totalFreq
				props.setData({
					totalFreq,
					...props.data,
				})
			}
			function mouseout(d) {
				let data = dataProvide()
				props.setData(data)
			}
		}
		return () => {
			if (props.data) {
				let { stateFreq } = props.data
				g.y.domain([0, d3.max(stateFreq, d => d[0])])
				d3.selectAll('g .' + classes.barAxis).remove()

				let bars = d3
					.select('.' + classes.chart)
					.selectAll('.' + classes.barGrp)
					.data(props.data.stateFreq)
				bars
					.select('rect')
					.transition()
					.duration(1000)
					.attr('y', d => g.y(d[0]))
					.attr('height', d => g.height - g.y(d[0]))

				bars
					.select('text')
					.transition()
					.duration(1000)
					.attr('y', d => g.y(d[0]))
					.text(d => d3.format('.2s')(d[0]))
			}
		}
	}, [props.data])
	return (
		<>
			<svg
				width={g.width + g.HGDim.l + g.HGDim.r}
				height={g.height + g.HGDim.t + g.HGDim.b}>
				<g
					className={classes.chart}
					transform={`translate(${g.HGDim.l},${g.HGDim.t})`}></g>
			</svg>
		</>
	)
}
