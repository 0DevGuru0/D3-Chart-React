import React from 'react'

import useData from './data'
import classes from './styles.module.scss'
import D3Prov from './d3-provision'

const SunBurst = props => {
	const width = props.width
	const height = 600
	let [nodes, radius] = useData({ width, height })
	D3Prov(nodes, props)
	return (
		<div style={{ position: 'relative' }}>
			<div className={classes.explanation} style={{ visibility: 'hidden' }}>
				<span className={classes.percentage}></span>
				<br />
				of visits begin with this sequence of pages
			</div>
			<svg width={width} height={height} className={classes['sequence-chart']}>
				<g
					id={classes.container}
					transform={'translate(' + width / 2 + ',' + height / 2 + ')'}>
					{/* 
					Bounding circle underneath the sunburst, to make it easier to detect //
					when the mouse leaves the parent g. 
					*/}
					<circle r={radius} style={{ opacity: 0 }}></circle>
				</g>
			</svg>
		</div>
	)
}

export default SunBurst
