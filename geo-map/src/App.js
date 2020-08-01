import React from 'react'
import VersionOne from './components/versionOne'
import styled from 'styled-components'

const Div = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`
function App() {
	return (
		<Div>
			<VersionOne />
		</Div>
	)
}

export default App
