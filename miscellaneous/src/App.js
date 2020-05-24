import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import Chart from './component/chart'
import Slider from './component/utils/slider'
import CtrlButton from './component/utils/ctrlButton'

import { CtrlProvider } from './hooks/yearContext'

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
function App() {
	let [Year, setYear] = useState(0)
	const data = useRef(null)
	let count = useRef(0)
	useEffect(() => {
		// console.log('Year::', Year)
		data.current.chart(data.current.data[Year])
		count.current = Year
	}, [Year])

	return (
		<Div>
			<Chart ctrlData={d => (data.current = d)} />
			<CtrlProvider value={{ Year, setYear, count }}>
				<Slider />
				<CtrlButton />
			</CtrlProvider>
		</Div>
	)
}

export default App
