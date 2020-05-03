import React, { useState } from 'react'
import SunBurstChart from './component/chart'
import BreadCrumb from './component/breadCrumb'
import Legend from './component/legend'
import classes from './app.module.scss'
function App() {
	const width = 750
	const [breadCrumb, setBreadCrumb] = useState({
		update: false,
		nodeArray: null,
		percentage: 0,
	})
	let colors = {
		home: '#5687d1',
		product: '#7b615c',
		search: '#de783b',
		account: '#6ab975',
		other: '#a173d1',
		end: '#bbbbbb',
		root: '#262626',
	}
	return (
		<>
			<div className={classes.App}>
				<BreadCrumb width={width} data={breadCrumb} colors={colors} />
				<SunBurstChart
					width={width}
					breadCrumbUpdater={setBreadCrumb}
					colors={colors}
				/>
				<Legend colors={colors} />
			</div>
		</>
	)
}

export default App
