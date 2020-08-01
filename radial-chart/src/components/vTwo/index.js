import React, { useEffect } from 'react'
import * as d3 from 'd3'

import classes from './styles.module.scss'
import * as g from './helper'
import dataProvide from './data'
export default function RadialChart() {
	let data = dataProvide()
	useEffect(() => {
		if (data) console.log(data)
	}, [data])
	return (
		<>
			<svg
				width={g.width}
				height={g.height}
				className={classes.chart}>
				<g
					transform={`translate(${g.width / 2},${
						g.height / 2
					})`}>
					<defs>
						<linearGradient
							id={classes.gradient_chart_area}
							x1='50%'
							x2='50%'
							y1='0%'
							y2='100%'
							spreadMethod='pad'>
							<stop
								offset='0%'
								stopColor='#EDF0F0'
								stopOpacity='1'></stop>
							<stop
								offset='100%'
								stopColor='#ACB7BE'
								stopOpacity='1'></stop>
						</linearGradient>
						<linearGradient
							id={classes.gradient_question}
							x1='50%'
							x2='50%'
							y1='0%'
							y2='100%'
							spreadMethod='pad'>
							<stop
								offset='0%'
								stopColor='#F6F8F9'
								stopOpacity='1'></stop>
							<stop
								offset='100%'
								stopColor='#D4DAE0'
								stopOpacity='1'></stop>
						</linearGradient>
						<linearGradient
							id={classes.gradient_bars}
							cx='0'
							cy='0'
							r={g.maxBarHeight}
							spreadMethod='pad'>
							<stop
								offset='0%'
								stopColor='#F3D5AA'
								stopOpacity='1'></stop>
							<stop
								offset='50%'
								stopColor='#F4A636'
								stopOpacity='1'></stop>
							<stop
								offset='100%'
								stopColor='#AF4427'
								stopOpacity='1'></stop>
						</linearGradient>
						<circle
							r={g.maxBarHeight + 70}
							className={classes.category_circle}></circle>
						<circle
							r={g.maxBarHeight + 40}
							className={classes.question_circle}></circle>
						<circle
							r={g.maxBarHeight}
							className={classes.chart_area_circle}></circle>
						<circle
							r={g.innerRadius}
							className={classes.center_circle}></circle>
					</defs>
				</g>
			</svg>
		</>
	)
}
