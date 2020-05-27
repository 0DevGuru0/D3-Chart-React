/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import classes from './styles.module.scss'
import * as g from './helpers'
import Button from '@material-ui/core/Button'

let drawPie = (data, { current: cachedData }) => {
	let path = d3
		.select(`svg g .${classes.slices}`)
		.selectAll('path')
		.data(g.pie(data), d => d.brand)

	let path_EU = path
		.enter()
		.append('path')
		.attr('fill', d => g.color(d.data.brand))
		.merge(path)
		.transition()
		.ease(d3.easeBounce)
		// .ease(d3.easeBackInOut.overshoot(2))
		// .ease(d3.easeBackIn.overshoot(2))
		.duration(1000)
		.attrTween('d', function (d, i) {
			cachedData.push(cachedData[i] || d)
			let interpolate = d3.interpolate(cachedData[i], d)
			cachedData[i] = interpolate(0)
			return t => g.arc(interpolate(t))
		})
	path.exit().remove()
}
let drawLines = (data, { current: cachedData }) => {
	let line = d3
		.select(`svg g .${classes.lines}`)
		.selectAll('polyline')
		.data(g.pie(data), d => d.brand)

	let line_EU = line
		.enter()
		.append('polyline')
		.merge(line)
		.transition()
		.ease(d3.easeBounce)
		// .ease(d3.easeBackInOut.overshoot(2))
		// .ease(d3.easeBackIn.overshoot(2))
		.duration(1000)
		.attrTween('points', function (d, i) {
			cachedData.push(cachedData[i] || d)
			let interpolate = d3.interpolate(cachedData[i], d)
			cachedData[i] = interpolate(0)
			return t => {
				let d2 = interpolate(t)
				let pos = g.line_arc.centroid(d2)
				pos[0] =
					g.radius * 1.3 * (g.midAngle(d2) < Math.PI ? 1 : -1)
				return [
					g.arc.centroid(d2),
					g.line_arc.centroid(d2),
					pos,
				]
			}
		})
	line.exit().remove()
}
let drawTexts = (data, { current: cachedData }) => {
	let text = d3
		.select(`svg g .${classes.labels}`)
		.selectAll('text')
		.data(g.pie(data), d => d.brand)

	let text_EU = text
		.enter()
		.append('text')
		.attr('dy', '-0em')
		.text(d => d.data.brand)
		.merge(text)
		.transition()
		.ease(d3.easeBounce)
		// .ease(d3.easeBackInOut.overshoot(2))
		// .ease(d3.easeBackIn.overshoot(2))
		.duration(1000)
		.attrTween('transform', function (d, i) {
			cachedData.push(cachedData[i] || d)
			let interpolate = d3.interpolate(cachedData[i], d)
			cachedData[i] = interpolate(0)
			return t => {
				let d2 = interpolate(t)
				let pos = g.line_arc.centroid(d2)
				pos[0] =
					g.radius * 1.3 * (g.midAngle(d2) < Math.PI ? 1 : -1)
				return `translate(${pos})`
			}
		})
		.attrTween('text-anchor', function (d, i) {
			cachedData.push(cachedData[i] || d)
			let interpolate = d3.interpolate(cachedData[i], d)
			cachedData[i] = interpolate(0)
			return t => {
				let d2 = interpolate(t)
				return g.midAngle(d2) < Math.PI ? 'start' : 'end'
			}
		})
	text.exit().remove()
}

export default function VersionOne() {
	let pieData = useRef([])
	let textData = useRef([])
	let lineData = useRef([])

	useEffect(() => {
		const dd = g.data()
		drawPie(dd, pieData)
		drawLines(dd, lineData)
		drawTexts(dd, textData)
	}, [])

	const clickHandler = () => {
		const dd = g.data()
		drawPie(dd, pieData)
		drawLines(dd, lineData)
		drawTexts(dd, textData)
	}

	return (
		<div className={classes.container}>
			<svg
				width={g.width}
				height={g.height}
				className={classes.chart}>
				<g
					transform={`translate(${g.width / 2},${
						g.height / 2
					})`}>
					<g className={classes.slices}></g>
					<g className={classes.labels}></g>
					<g className={classes.lines}></g>
				</g>
			</svg>
			<Button
				style={{ width: '50%' }}
				variant='outlined'
				color='primary'
				onClick={clickHandler}>
				RANDOM
			</Button>
		</div>
	)
}
