import styled, { css } from 'styled-components'
import { animated } from 'react-spring'
import { lighten } from 'polished'

import { ContainerProps } from './types'

const toastTypeVariations = {
	info: css`
		background: ${props => lighten(0.5, props.theme.colors.messages.info)};
		color: ${props => props.theme.colors.messages.info};
	`,
	success: css`
		background: ${props => lighten(0.5, props.theme.colors.messages.success)};
		color: ${props => props.theme.colors.messages.success};
	`,
	error: css`
		background: ${props => lighten(0.5, props.theme.colors.messages.error)};
		color: ${props => props.theme.colors.messages.error};
	`,
}

export const Container = styled(animated.div)<ContainerProps>`
	width: 320px;
	position: relative;
	padding: 16px 30px 16px 16px;
	border-radius: 10px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, ${props => props.theme.colors.senary});
	display: flex;
	& + div {
		margin-top: 8px;
	}
	${props => toastTypeVariations[props.type || 'info']};
	${props =>
		!props.hasdescription &&
		css`
			align-items: center;
			svg {
				margin-top: 0;
			}
		`};
	> svg {
		margin: 4px 12px 0 0;
	}
	div {
		flex: 1;
		p {
			margin-top: 4px;
			font-size: 14px;
			opacity: 0.8;
			line-height: 20px;
		}
	}
	button {
		position: absolute;
		right: 16px;
		top: 19px;
		border: none;
		background: transparent;
		color: inherit;
	}
`
