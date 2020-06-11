/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Histogram from './histogram'
import PieChart from './pieChart'
import Legend from './legend'
import dataProvide from './data'

export default function VersionThree() {
	const [stateF, setStateF] = useState()
	const [totalF, setTotalF] = useState()

	useEffect(() => {
		let { stateFreq, totalFreq } = dataProvide()
		setStateF(stateFreq)
		setTotalF(totalFreq)
	}, [])

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				flexFlow: 'row wrap',
			}}>
			<PieChart totalFreq={totalF} setStateFreq={setStateF} />
			<Histogram stateFreq={stateF} setTotalFreq={setTotalF} />
			<Legend totalFreq={totalF} />
		</div>
	)
}
