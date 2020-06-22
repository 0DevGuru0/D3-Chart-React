import * as d3 from 'd3'

export const width = 960
export const height = 500
export const outerRadius =
	Math.min(width, height) * 0.5 - 10
export const innerRadius = outerRadius * 0.6
let n = 10
export const data0 = d3.range(n).map(Math.random)
export const data1 = d3.range(n).map(Math.random)
export const pie = d3.pie().sort(null)
export const arcs = (data0, data1) => {
	let arc0 = pie(data0)
	let arc1 = pie(data1)
	let i = -1
	let arc
	while (++i < n) {
		arc = arc0[i]
		arc.innerRadius = innerRadius
		arc.outerRadius = outerRadius
		arc.next = arc1[i]
	}
	return arc0
}
export const arc = d3.arc()
export const color = d3.scaleOrdinal(d3.schemeCategory10)
export function tweenArc(b) {
	return function (a, i) {
		let d = b.call(this, a, i)
		i = d3.interpolate(a, d)
		for (let k in d) a[k] = d[k] // update data
		return t => {
			let arcs = arc(i(t))
			return arcs
		}
	}
}
