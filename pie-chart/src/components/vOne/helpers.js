import * as d3 from 'd3'

import preData from './data/data.json'

export let width = 700
export let height = 600
export let radius = Math.min(width, height) / 3

export const data = () =>
	preData.map(({ brand }) => {
		return {
			brand,
			value: Math.random(),
		}
	})

export const pie = d3
	.pie()
	.value(d => d.value)
	.sort(null)
	.padAngle(0.02)

export const arc = d3
	.arc()
	.startAngle(d => d.startAngle)
	.endAngle(d => d.endAngle)
	.padAngle(d => d.padAngle)
	.innerRadius(radius * 1.0)
	.outerRadius(radius * 0.2)
	.cornerRadius(5)

export const line_arc = d3
	.arc()
	.startAngle(d => d.startAngle)
	.endAngle(d => d.endAngle)
	.padAngle(d => d.padAngle)
	.innerRadius(radius * 1.2)
	.outerRadius(radius * 1.2)

export const color = d3.scaleOrdinal(d3.schemeCategory10)

export const midAngle = d =>
	d.startAngle + (d.endAngle - d.startAngle) / 2
