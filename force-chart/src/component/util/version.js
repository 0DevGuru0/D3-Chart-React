import React from 'react'
import styled from 'styled-components'
const Header = styled.header`
	font-family: 'Raleway', sans-serif;
	background-color: #fff;
	padding: 1rem;
	margin-top: 0.5rem;
	border-radius: 5px;
	text-align: center;
	font-size: 3rem;
	color: #377eb8;
	writing-mode: vertical-rl;
	text-orientation: mixed;
	height: 40rem;
`

export default props => <Header>{props.children}</Header>
