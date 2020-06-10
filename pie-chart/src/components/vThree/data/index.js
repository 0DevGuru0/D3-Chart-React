import * as d3 from 'd3'
import data from './data.json'
export default function DataProvide() {
	data.forEach(d => {
		d.total = d.freq.high + d.freq.low + d.freq.mid
	})
	let stateFreq = data.map(d => [d.total, d.State])

	let totalFreq = ['low', 'mid', 'high'].map(l => {
		return {
			type: l,
			freq: d3.sum(data, d => d.freq[l]),
		}
	})

	return { stateFreq, totalFreq }
}
