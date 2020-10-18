import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
	background: ${props => props.theme.colors.primary};
	height: 56px;
	border-radius: 10px;
	border: 0;
	padding: 0 16px;
	width: 100%;
	margin-top: 16px;
	color: ${props => props.theme.colors.background};
	font-weight: 500;
	transition: background-color 0.2s;
	&:hover {
		background: ${props => shade(0.2, props.theme.colors.primary)};
	}
`
