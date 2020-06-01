import React from 'react'
import Slider from './slider'
export default function RunsCtrl({ setCurrent, current }) {
	const runChangeHandler = (e, v) => {
		e.preventDefault()
		setCurrent({
			...current,
			Run: v,
		})
	}
	const ExptChangeHandler = (e, v) => {
		e.preventDefault()
		setCurrent({
			...current,
			Experiment: v,
		})
	}
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-around',
			}}>
			<div style={{ width: '40%' }}>
				<h4>Change Run:</h4>
				<Slider
					def={10}
					max={20}
					min={1}
					onChange={runChangeHandler}
				/>
			</div>
			<div style={{ width: '40%' }}>
				<h4> change Experiment:</h4>
				<Slider
					def={3}
					max={6}
					min={1}
					onChange={ExptChangeHandler}
				/>
			</div>
		</div>
	)
}
