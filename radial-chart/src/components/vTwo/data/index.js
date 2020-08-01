import * as d3 from 'd3'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import preData from './data.csv'

export default function DataProvide() {
	const [data, setData] = useState()
	useEffect(() => {
		d3.csv(preData).then(data => {
			const categories = _.keys(
				_.keyBy(data, 'category_label')
			)
			const catCounts = _.countBy(data, 'category_label')
			const numCategories = categories.length
			setData({ data, categories, catCounts, numCategories })
		})
	}, [])
	return data
}
