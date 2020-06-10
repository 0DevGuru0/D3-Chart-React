import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react'
import Histogram from './histogram'
import PieChart from './pieChart'
import Legend from './legend'
import dataProvide from './data'

export default function VersionThree() {
	const [data, setData] = useState()
	useEffect(() => {
		let result = dataProvide()
		setData(result)
	}, [])
	console.log(data)
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			}}>
			<Histogram data={data} setData={setData} />
			<PieChart data={data} setData={setData} />
			<Legend data={data} />
		</div>
	)
}
