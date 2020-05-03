/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { select, selectAll, arc, transition } from 'd3'
import classes from './styles.module.scss'

let _arc = arc()
	.startAngle(d => d.x0)
	.endAngle(d => d.x1)
	.innerRadius(d => Math.sqrt(d.y0))
	.outerRadius(d => Math.sqrt(d.y1))
	.cornerRadius(3)

let t = transition().duration(1000)

function mouseleave(totalSize, props) {
	// Hide the breadcrumb trail
	select('#trail').style('visibility', 'hidden')
	// Deactivate all segments during transition.
	selectAll('path').on('mouseover', null)
	// Transition each segment to full opacity and then reactivate it.
	selectAll('path')
		.transition(t)
		.style('opacity', 1)
		.on('end', function () {
			select(this).on('mouseover', d => mouseover(d, totalSize, props))
		})
}

function mouseover(d, totalSize, props) {
	let percentage = ((100 * d.value) / totalSize).toPrecision(3)
	let percentageString = percentage + '%'
	if (percentage < 0.1) percentageString = '< 0.1%'
	select(`.${classes.percentage}`).text(percentageString)
	select(`.${classes.explanation}`).style('visibility', '')
	let sequenceArray = d.ancestors().reverse()
	sequenceArray.shift()
	// trigger breadcrumb updater
	props.breadCrumbUpdater({
		update: true,
		nodeArray: sequenceArray,
		percentage: percentageString,
	})
	selectAll('path').style('opacity', 0.3)

	selectAll('path')
		.filter(node => sequenceArray.indexOf(node) >= 0)
		.style('opacity', 1)
}

const D3Provision = (nodes, props) => {
	let totalSize = useRef(0)
	// Total size of all segments; we set this later, after loading the data.
	useEffect(() => {
		let path = select('svg g')
			.selectAll('path')
			.data(nodes)
			.enter()
			.append('path')
			.attr('d', _arc)
			.attr('fill-rule', 'evenodd')
			.style('fill', d => props.colors[d.data.name])
			.style('opacity', 1)
			.style('stroke', '#fff')

		path.on('mouseover', d => mouseover(d, totalSize.current, props))

		select(`#${classes.container}`).on('mouseleave', d =>
			mouseleave(totalSize.current, props)
		)

		// Get total size of the tree = value of root node from partition.
		totalSize.current = path.empty() ? undefined : path.datum().value
	}, [props.update])
}
export default D3Provision
