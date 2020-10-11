import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

import { ContainerProps } from './types'

export const Container = styled.View<ContainerProps>`
	width: 100%;
	height: 60px;
	padding: 0 16px;
	background: ${props => props.theme.colors.quartenary};
	border-radius: 10px;
	margin-bottom: 8px;
	border-width: 2px;
	border-style: solid;
	border-color: ${props => props.theme.colors.quartenary};

	flex-direction: row;
	align-items: center;

	${props =>
		props.isErrored &&
		css`
			border-color: ${props => props.theme.colors.septenary};
		`}

	${props =>
		props.isFocused &&
		css`
			border-color: ${props => props.theme.colors.primary};
		`}
`

export const TextInput = styled.TextInput`
	flex: 1;
	color: ${props => props.theme.colors.white};
	font-size: 16px;
	font-family: ${props => props.theme.fonts.primary.regular};
`

export const Icon = styled(Feather)`
	margin-right: 16px;
`
