import React, { useEffect } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

import * as g from './helper'
import DataProvision from './data'
const ToolTip = styled.div`
	position: absolute;
	width: 12rem;
	height: 5rem;
	padding: 2px;
	font: 1rem 'Lato';
	background: lightsteelblue;
	border: 0px;
	border-radius: 8px;
	pointer-events: none;
	line-height: 2rem;
	opacity: none;
	visibility: hidden;
`

export default function GeoMapChart() {
	const data = DataProvision()

	useEffect(() => {
		if (data) {
			const [populationById, worldGraph] = data
			console.log(data)
			const svg = d3.select('#geoMapChart g')
			svg
				.append('g')
				.attr('id', 'countries')
				.selectAll('path')
				.data(worldGraph.features)
				.enter()
				.append('path')
				.attr('d', g.path)
				.style('fill', d => g.color(populationById[d.id]))
				.style('stroke', 'white')
				.style('stroke-width', 1.5)
				.style('opacity', 0.8)
				.style('stroke', 'white')
				.style('stroke-width', 0.3)
				.on('mouseover', mouseover)
				.on('mouseout', mouseout)

			const toolTip = d3
				.select('#toolTip')
				.style('position', 'absolute')
				.style('opacity', 0)
			function mouseover(d) {
				toolTip
					.transition()
					.duration(200)
					.style('opacity', 0.9)
					.style('visibility', 'visible')
				toolTip
					.html(
						"<strong>Country: </strong><span id='toolTip_details'>" +
							d.properties.name +
							'<br></span>' +
							"<strong>Population: </strong><span id='toolTip_details'>" +
							d3.format(',')(d.population) +
							'</span>'
					)
					.style('left', d3.event.pageX + 'px')
					.style('top', d3.event.pageY - 28 + 'px')

				d3
					.select(this)
					.style('opacity', 1)
					.style('stroke', 'white')
					.style('stroke-width', 3)
			}
			function mouseout(d) {
				toolTip
					.transition()
					.duration(500)
					.style('opacity', 0)
					.style('visibility', 'hidden')
				d3
					.select(this)
					.style('opacity', 0.8)
					.style('stroke', 'white')
					.style('stroke-width', 0.3)
			}
		}
	}, [data])
	return (
		<>
			<svg width={g.width} height={g.height} id='geoMapChart'>
				<g
					transform={`translate(${g.margin.left},${g.margin.top})`}></g>
			</svg>
			<ToolTip id='toolTip' />
		</>
	)
}
