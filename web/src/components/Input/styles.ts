import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

import { ContainerProps } from './types'

export const Container = styled.div<ContainerProps>`
	background: ${props => props.theme.colors.quartenary};
	border-radius: 10px;
	border: 2px solid ${props => props.theme.colors.quartenary};
	padding: 16px;
	width: 100%;
	display: flex;
	align-items: center;
	color: ${props => props.theme.colors.octonary};
	${props =>
		props.isErrored &&
		css`
			border-color: ${props => props.theme.colors.septenary};
		`}
	${props =>
		props.isFocused &&
		css`
			color: ${props => props.theme.colors.primary};
			border-color: ${props => props.theme.colors.primary};
		`}
	${props =>
		props.isFilled &&
		css`
			color: ${props => props.theme.colors.primary};
		`}
	& + div {
		margin-top: 8px;
	}
	svg {
		margin-right: 16px;
	}
	input {
		color: ${props => props.theme.colors.tertiary};
		flex: 1;
		background: transparent;
		border: 0;
		&::placeholder {
			color: ${props => props.theme.colors.octonary};
		}
	}
`

export const Error = styled(Tooltip)`
	height: 20px;
	margin-left: 16px;
	svg {
		margin: 0;
	}
	span {
		background: ${props => props.theme.colors.septenary};
		color: ${props => props.theme.colors.white};
		&::before {
			border-color: ${props => props.theme.colors.septenary} transparent;
		}
	}
`
