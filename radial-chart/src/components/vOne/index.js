import React, { useState, useEffect } from 'react'
import classes from './styles.module.scss'
import { DataProvide } from './data'
import RadialChart from './radialChart'
import * as g from './helper'
import { select } from 'd3'
import Button from '@material-ui/core/Button'

const kind1 = 'AdjustedRevenue'
const kind2 = 'MetricTonnage'

export default function Chart() {
	const [dataKind, setDataKind] = useState(kind1)
	let [data] = DataProvide()

	useEffect(() => {
		if (data) {
			if (dataKind === kind1) {
				RadialChart(data, kind1)
			} else if (dataKind === kind2) {
				RadialChart(data, kind2)
			}
		}
	}, [data, dataKind])
	const dataKindSwitch = e => {
		select('svg g').remove()
		select('svg')
			.append('g')
			.classed(classes.chart, true)
			.attr(
				'transform',
				`translate(${g.width / 2},${g.height / 2.18})`
			)
		e.preventDefault()
		setDataKind(dataKind === kind1 ? kind2 : kind1)
	}
	return (
		<>
			<svg width={g.width} height={g.height}>
				<g
					className={classes.chart}
					transform={`translate(${g.width / 2},${
						g.height / 2.18
					})`}></g>
			</svg>
			<Button
				variant='outlined'
				color='primary'
				style={{ width: '50%' }}
				onClick={dataKindSwitch}>
				DataKind
			</Button>
		</>
	)
}
