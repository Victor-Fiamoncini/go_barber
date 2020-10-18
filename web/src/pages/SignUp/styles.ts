import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import signUpBackgroundImg from '../../assets/sign-up-background.png'

export const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: stretch;
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 700px;
`

export const Background = styled.div`
	flex: 1;
	background: url(${signUpBackgroundImg}) no-repeat center;
	background-size: cover;
`

const appearFromRight = keyframes`
	from {
		opacity: 0;
		transform: translateX(80px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`

export const AnimationContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	animation: ${appearFromRight} 0.8s;
	form {
		margin: 80px 0;
		width: 340px;
		text-align: center;
		h1 {
			margin-bottom: 24px;
		}
		a {
			color: ${props => props.theme.colors.tertiary};
			text-decoration: none;
			display: block;
			margin-top: 24px;
			transition: color 0.2s;
			&:hover {
				color: ${props => shade(0.2, props.theme.colors.tertiary)};
			}
		}
	}
	> a {
		display: flex;
		align-items: center;
		color: ${props => props.theme.colors.primary};
		text-decoration: none;
		margin-top: 24px;
		transition: color 0.2s;
		&:hover {
			color: ${props => shade(0.2, props.theme.colors.primary)};
		}
		svg {
			margin-right: 16px;
		}
	}
`
