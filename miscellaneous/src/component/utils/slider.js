/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useState,
	useRef,
	useContext,
	useEffect,
} from 'react'
import Slider from '@material-ui/core/Slider'
import styled from 'styled-components'

import ctrlContext from '../../hooks/yearContext'

const Div = styled.div`
	width: 700px;
	margin: auto;
	margin-top: 2rem;
`
const DiscreteSlider = props => {
	let data = useContext(ctrlContext)
	let [sliderVal, setSliderVal] = useState(1805)
	let sliderRef = useRef(null)

	useEffect(() => setSliderVal(data.Year + 1805), [
		data.Year,
	])

	const changeHandler = (e, val) => {
		if (
			!sliderRef.current ||
			(sliderRef.current && sliderRef.current !== val)
		) {
			data.setYear(val ? val - 1805 : 0)
			setSliderVal(val)
		}

		sliderRef.current = val
	}
	return (
		<Div>
			<Slider
				id='slider'
				defaultValue={1805}
				getAriaValueText={v => `${v}Y`}
				aria-labelledby='slider'
				step={1}
				marks
				min={1805}
				max={2019}
				valueLabelDisplay='auto'
				onChange={changeHandler}
				value={sliderVal}
			/>
		</Div>
	)
}

export default DiscreteSlider
