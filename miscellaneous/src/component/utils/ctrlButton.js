/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useContext } from 'react'
import { fromEvent, interval } from 'rxjs'
import {
	mergeMap,
	takeUntil,
	takeWhile,
} from 'rxjs/operators'
import Button from '@material-ui/core/Button'

import ctrlContext from '../../hooks/yearContext'

export default function CtrlButton() {
	const butStartRef = useRef(null)
	const butPauseRef = useRef(null)
	let data = useContext(ctrlContext)

	useEffect(() => {
		let startButtonClick = fromEvent(
			butStartRef.current,
			'click'
		)
		let pauseButtonClick = fromEvent(
			butPauseRef.current,
			'click'
		)

		startButtonClick
			.pipe(
				mergeMap(() =>
					interval(1000).pipe(
						takeUntil(pauseButtonClick),
						takeWhile(() => data.count.current < 214)
					)
				)
			)
			.subscribe(() => {
				data.count.current += 1
				data.setYear(data.count.current)
			})
	}, [])
	return (
		<div>
			<Button
				variant='contained'
				color='primary'
				style={{ marginRight: '1rem' }}
				ref={butStartRef}>
				Start
			</Button>
			<Button
				variant='contained'
				color='secondary'
				disabled={data.Year < 214 ? false : true}
				ref={butPauseRef}>
				Pause
			</Button>
		</div>
	)
}
