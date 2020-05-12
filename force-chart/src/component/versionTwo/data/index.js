import { useMemo, useEffect, useState } from 'react'
import * as d3 from 'd3'
import _data from './data.csv'
const DataProvision = () => {
	const [data, setData] = useState(null)
	useEffect(() => {}, [])
	console.log(data)
	return [data]
}

export default DataProvision
