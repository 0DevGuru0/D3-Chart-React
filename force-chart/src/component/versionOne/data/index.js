import { useMemo } from 'react'
import data from './data.json'

const DataProvision = props => {
	return useMemo(() => {
		let graph = {
			nodes: data.vertices,
			links: data.edges,
		}
		graph.nodes.forEach((d, i) => {
			d.id = (i + 1).toString()
		})
		graph.links.forEach(d => {
			d.target = d.to.toString()
			d.source = d.from.toString()
		})
		return graph
	}, [])
}
export default DataProvision
