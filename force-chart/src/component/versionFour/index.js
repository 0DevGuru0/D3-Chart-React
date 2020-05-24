/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as d3 from 'd3'
import classes from './styles.module.scss'
import Headers from '../util/version'
import DataProvide from './data'
import * as g from './helper.js'

const VersionFour = () => {
	let data = DataProvide()

	useEffect(() => {
		if (data) {
			let { flatAgencies, nestedData } = data
			console.log(data)

			g.rScale.domain([
				0,
				d3.max(flatAgencies, d => d.value.budget),
			])

			g.xScale.domain(nestedData[0].values.map(d => d.key))
			g.xScale2.domain(nestedData.map(d => d.key))

			let circle = d3
				.select(`.${classes.circle}`)
				.selectAll('circle')
				.data(flatAgencies)

			circle.exit().remove()

			let circleEnter = circle
				.enter()
				.append('circle')
				.attr('r', d => g.rScale(d.value.budget))
				.attr('fill', d => g.colorScale(d.key))

			circleEnter
				.append('text')
				.text(
					d => d.key + ' $' + d3.format('.2s')(d.value.budget)
				)

			g.forceSimulation.nodes(flatAgencies).on('tick', () => {
				circleEnter
					.merge(circle)
					.attr('cx', d => d.x)
					.attr('cy', d => d.y)
			})

			d3.select(`.${classes.xAxis}`).call(d3.axisTop(g.xScale))
			d3
				.select(`.${classes.xAxis2}`)
				.call(d3.axisTop(g.xScale2))
		}
	}, [data])

	useEffect(() => {
		if (data) {
			let keys = []
			let beas = []
			let grants = []
			data.flatAgencies.map(el => {
				keys.push(el.key)
				grants.push(el.grant)
				beas.push(el.bea)
			})
			keys = [...new Set(keys)]
			beas = [...new Set(beas)]
			grants = [...new Set(grants)]
			console.log(keys, beas, grants)
			let labels = d3
				.select(`.${classes.labels}`)
				.attr(
					'transform',
					'translate(' + (g.width / 2 - 150) + ',0)'
				)
				.selectAll('g')
				.data(beas)
			let lbEnter = labels.enter().append('g')
			let lbRect = lbEnter
				.append('rect')
				.attr('width', 10)
				.attr('height', 10)
				.attr('x', (d, i) => i * 120)
				.attr('y', g.height - 20)
				.attr('fill', d => g.colorScale(d))
			lbEnter
				.append('text')
				.text(d => d)
				.attr('x', (d, i) => i * 120 + 12)
				.attr('y', g.height - 10)
		}
	}, [data])
	const changeHandler = (event, target) => {
		let xScaleConf = target === 'grant' ? g.xScale2 : g.xScale
		let xAxisConf = target === 'grant' ? 'xAxis2' : 'xAxis'
		let hide_xAxisConf =
			target !== 'grant' ? 'xAxis2' : 'xAxis'
		g.forceSimulation.force(
			'x',
			event.target.checked
				? d3
						.forceX(
							d =>
								xScaleConf(d[target]) + xScaleConf.bandwidth() / 2
						)
						.strength(0.3)
				: d3.forceX(g.width / 2)
		)
		d3
			.select(`.${classes[xAxisConf]}`)
			.style(
				'display',
				event.target.checked ? 'block' : 'none'
			)
		d3
			.select(`.${classes[hide_xAxisConf]}`)
			.style(
				'display',
				!event.target.checked ? 'block' : 'none'
			)
		d3
			.select(`.${classes.circle}`)
			.selectAll('circle')
			.attr('fill', d =>
				event.target.checked
					? g.colorScale(d[target])
					: g.colorScale(d.key)
			)

		g.forceSimulation.alpha(0.8).restart()
	}

	return (
		<>
			<Headers>VersionFour</Headers>
			<div className={classes.ctrl}>
				<input
					type='checkbox'
					id='chkBEA'
					onChange={e => changeHandler(e, 'bea')}
				/>
				<label htmlFor='chkBEA'>Group by BEA Category</label>
				<input
					type='checkbox'
					id='chkGrant'
					onChange={e => changeHandler(e, 'grant')}
				/>
				<label htmlFor='chkGrant'>Group by Grant</label>
			</div>
			<svg
				width={g.width}
				height={g.height}
				className={classes.budget}>
				<g className={classes.circle}></g>
				<g
					className={classes.xAxis}
					transform='translate(0,50)'></g>
				<g
					className={classes.xAxis2}
					transform='translate(0,50)'></g>
				<g className={classes.labels}></g>
			</svg>
		</>
	)
}

export default VersionFour
