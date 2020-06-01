import React, { useState } from 'react'
import PieChart from './chart'
import DataProvide from './data'
import Ctrl from './ctrl'
export default function VersionTwo() {
	const [current, setCurrent] = useState({
		Run: 10,
		Experiment: 3,
	})

	let data = DataProvide(current)

	return (
		<div>
			<PieChart data={data} />
			<Ctrl current={current} setCurrent={setCurrent} />
		</div>
	)
}
