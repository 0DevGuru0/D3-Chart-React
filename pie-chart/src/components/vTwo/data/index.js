/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import * as d3 from 'd3'

import preData from './data.csv'

/*
	COLUMNS --> ["Experiment", "Run", "Speed"]
*/
export default function DataProvide(current) {
	const [data, setData] = useState(null)
	useEffect(() => {
		d3
			.csv(preData, d => {
				return {
					Experiment: +d.Experiment,
					Run: +d.Run,
					Speed: +d.Speed,
				}
			})
			.then(dataset => {
				let columns = dataset.columns
				dataset = dataset.filter(
					d =>
						d.Run <= current.Run &&
						d.Experiment <= current.Experiment
				)
				let sigScale = d3
					.scaleLinear()
					.domain(d3.extent(dataset, d => d[columns[2]]))
				let nestData = d3
					.nest()
					.key(d => d[columns[1]])
					.rollup(v => {
						return {
							length: v.length,
							speedTotal: d3.sum(v, d => d.Speed),
							maxSpeed: d3.max(v, d => d.Speed),
							minSpeed: d3.min(v, d => d.Speed),
							maxExperiment: d3.max(v, d => d.Experiment),
							minExperiment: d3.min(v, d => d.Experiment),
							...v,
						}
					})
					.entries(dataset)

				let pie = d3
					.pie()
					.value(d => d.value.speedTotal)
					.sort((a, b) => a.key - b.key)(nestData)
				pie.forEach(d => {
					d.children = d3
						.pie()
						.value(v => v[columns[2]])
						.sort((a, b) => a[columns[0]] - b[columns[0]])
						.startAngle(d.startAngle)
						.endAngle(d.endAngle)(d.data.value)
				})

				setData({ pie, columns, sigScale })
			})
	}, [current])
	return data
}
