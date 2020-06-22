import { useState, useEffect } from 'react'
import * as d3 from 'd3'
import preData from './data.csv'

export const DataProvide = () => {
	const [data, setData] = useState(null)
	useEffect(() => {
		d3.csv(preData).then(setData)
	}, [])
	return [data]
}
