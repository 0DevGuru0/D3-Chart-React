/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import classes from './styles.module.scss'
import * as d3 from 'd3'
import dataProvide from './data'
import * as g from './helper'
const drawChart = initialData => {
	g.area.domain(d3.extent(initialData, d => d.population))
	let circle = d3
		.select(`.${classes.svg}`)
		.selectAll('circle')
		.data(initialData)
	let circleEnter = circle
		.enter()
		.append('circle')
		.classed(classes.circle, true)
		.attr('fill', d => g.colorScale(d.continent))
		.attr('cx', d => g.xScale(d.income))
		.attr('cy', d => g.yScale(d.life_exp))
		.merge(circle)
		.transition()
		.duration(500)
		.attr('cx', d => g.xScale(d.income))
		.attr('cy', d => g.yScale(d.life_exp))
		.attr('r', d => Math.sqrt(g.area(d.population) / Math.PI))
	circle.exit().remove()
}

const Chart = props => {
	let data = dataProvide()
	useEffect(() => {
		d3
			.select(`.${classes.xAxis}`)
			.attr('transform', 'translate(0,' + g.height + ')')
			.call(g.xAxis)
		d3.select(`.${classes.yAxis}`).call(g.yAxis)
	}, [])
	useEffect(() => {
		let legend = d3
			.select(`.${classes.legend}`)
			.selectAll('rect')
			.data(['europe', 'asia', 'americas', 'africa'])

		let legendEnter_rect = legend
			.enter()
			.append('rect')
			.attr('width', 20)
			.attr('height', 20)
			.attr('x', g.width - 20)
			.attr('y', (d, i) => g.height - i * 30 - 80)
			.attr('fill', g.colorScale)
			.attr('rx', 2)
			.attr('ry', 2)
		let legendEnter_text = legend
			.enter()
			.append('text')
			.classed(classes.legendText, true)
			.attr('x', g.width - 25)
			.attr('y', (d, i) => g.height - i * 30 - 65)
			.attr('text-anchor', 'end')
			.text(d => d)
	}, [])
	useEffect(() => {
		let year = d3
			.select(`.${classes.legend}`)
			.append('text')
			.attr('y', g.height - 10)
			.attr('x', g.width - 40)
			.attr('font-size', '40px')
			.attr('opacity', '0.4')
			.attr('text-anchor', 'middle')
			.text('1800')

		let xLabel = d3
			.select(`.${classes.legend}`)
			.append('text')
			.attr('y', g.height + 50)
			.attr('x', g.width / 2)
			.attr('font-size', '20px')
			.attr('text-anchor', 'middle')
			.text('GDP Per Capita ($)')

		let yLabel = d3
			.select(`.${classes.legend}`)
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', -40)
			.attr('x', -(g.height / 2))
			.attr('font-size', '20px')
			.attr('text-anchor', 'middle')
			.text('Life Expectancy (Years)')
	}, [])
	// useEffect(() => {
	// 	let Year = props.sliderVal ? props.sliderVal - 1805 : 0
	// }, [props.sliderVal])
	useEffect(() => {
		props.ctrlData({
			chart: drawChart,
			data,
		})
		drawChart(data[0])
	}, [])
	return (
		<>
			<svg
				width={g.width + g.m.l + g.m.r}
				height={g.height + g.m.t + g.m.b}>
				<g
					className={classes.svg}
					transform={'translate(' + g.m.l + ', ' + g.m.t + ')'}>
					<g className={classes.xAxis}></g>
					<g className={classes.yAxis}></g>
					<g className={classes.legend}></g>
				</g>
			</svg>
		</>
	)
}
export default Chart
