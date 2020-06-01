import React from 'react'
import Slider from '@material-ui/core/Slider'

export default function slider({
	min,
	max,
	def,
	onChange,
}) {
	return (
		<Slider
			defaultValue={def ? def : 12}
			getAriaValueText={v => v}
			aria-labelledby='discrete-slider-small-steps'
			step={1}
			marks
			min={min}
			max={max}
			valueLabelDisplay='auto'
			onChange={onChange}
		/>
	)
}
