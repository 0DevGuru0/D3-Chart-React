import { useState, useEffect } from 'react'
import * as d3 from 'd3'
import populationData from './world_population.tsv'

const defaultPopulation = 0
const worldCountriesUrl =
	'https://raw.githubusercontent.com/jdamiani27/Data-Visualization-and-D3/master/lesson4/world_countries.json'

export default function DataProvider() {
	const [data, setData] = useState(null)
	useEffect(() => {
		Promise.all([
			d3.json(worldCountriesUrl),
			d3.tsv(populationData),
		]).then(([worldGraph, population]) => {
			var populationById = {}
			population.forEach(
				d => (populationById[d.id] = +d.population)
			)
			worldGraph.features.forEach(
				d =>
					(d.population =
						populationById[d.id] || defaultPopulation)
			)
			setData([populationById, worldGraph])
		})
	}, [])
	return data
}
