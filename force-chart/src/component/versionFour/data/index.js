import { useState, useEffect } from 'react'
import * as d3 from 'd3'
import csvData from './data.csv'
const DataProvide = () => {
	const [data, setData] = useState(null)
	useEffect(() => {
		let preprocessor = row => {
			if (row['2017'] === '0') return null

			row['2017'] = +row['2017'].replace(
				new RegExp(',', 'g'),
				''
			)
			return row
		}

		d3.csv(csvData, preprocessor).then(graph => {
			let nestedData = d3
				.nest()
				.key(d => d['Grant/non-grant split'])
				.key(d => d['BEA Category'])
				.key(d => d['Agency Name'])
				.rollup(leaves => {
					return {
						length: leaves.length,
						budget: d3.sum(leaves, d => +d['2017']),
					}
				})
				.entries(graph)
			var flatAgencies = []
			nestedData.forEach(function (g) {
				g.values.forEach(function (bea) {
					bea.values.forEach(function (a) {
						a.bea = bea.key
						a.grant = g.key
						flatAgencies.push(a)
					})
				})
			})
			setData({ nestedData, flatAgencies })
		})
	}, [])
	return data
}
export default DataProvide
