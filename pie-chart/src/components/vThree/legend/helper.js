import * as d3 from 'd3'
export const color = d3.scaleOrdinal(d3.schemeCategory10)
export const getLegendPrec = (d, data) => {
	var p = Math.max(0, d3.precisionFixed(0.005)),
		f = d3.format('.' + p + '%')
	return f(d.freq / d3.sum(data, d => d.freq))
}
