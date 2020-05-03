import { useMemo } from 'react'
import { partition, hierarchy } from 'd3'
import data from './data.json'

export default ({ width, height }) => {
	return useMemo(() => {
		let radius = Math.min(width, height) / 2

		let root = hierarchy(data)
			.sum(d => d.size)
			.sort((a, b) => b.value - a.value)
		console.log(root)
		let _partition = partition().size([2 * Math.PI, radius * radius])
		let nodes = _partition(root)
			.descendants()
			.filter(d => d.x1 - d.x0 > 0.005)
		console.log(nodes)
		return [nodes, radius]
	}, [width, height])
}
