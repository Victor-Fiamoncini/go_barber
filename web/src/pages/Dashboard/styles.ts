import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div``

export const Header = styled.header`
	padding: 32px 0;
	background: ${props => props.theme.colors.senary};
`

export const HeaderContent = styled.div`
	max-width: 1120px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	> img {
		height: 80px;
	}
	button {
		border: none;
		margin-left: auto;
		background: transparent;
		svg {
			color: ${props => props.theme.colors.quinary};
			width: 20px;
			height: 20px;
		}
	}
`

export const Profile = styled.div`
	display: flex;
	align-items: center;
	margin-left: 80px;
	img {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		object-fit: cover;
	}
	div {
		display: flex;
		flex-direction: column;
		margin-left: 16px;
		line-height: 24px;
		span {
			color: ${props => props.theme.colors.tertiary};
		}
		a {
			&:hover {
				opacity: 0.8;
			}
			strong {
				color: ${props => props.theme.colors.primary};
			}
		}
	}
`

export const Content = styled.main`
	max-width: 1120px;
	margin: 60px auto;
	display: flex;
`

export const Schedule = styled.div`
	flex: 1;
	margin-right: 120px;
	h1 {
		font-size: 36px;
	}
	p {
		display: flex;
		margin-top: 8px;
		color: ${props => props.theme.colors.primary};
		align-items: center;
		font-weight: 500;
		span + span::before {
			content: '';
			width: 1px;
			height: 12px;
			margin: 0 8px;
			border-left: 1px solid ${props => props.theme.colors.primary};
			background: ${props => props.theme.colors.primary};
		}
	}
`

export const NextAppointment = styled.div`
	margin-top: 64px;
	> strong {
		color: ${props => props.theme.colors.quinary};
		font-size: 20px;
		font-weight: 400;
	}
	div {
		background: ${props => props.theme.colors.secundary};
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-radius: 10px;
		margin-top: 24px;
		position: relative;
		&::before {
			content: '';
			position: absolute;
			height: 80%;
			width: 1px;
			left: 0;
			top: 10%;
			background: ${props => props.theme.colors.primary};
		}
		img {
			height: 80px;
			width: 80px;
			border-radius: 50%;
			object-fit: cover;
		}
		strong {
			margin-left: 24px;
			color: ${props => props.theme.colors.white};
		}
		span {
			margin-left: auto;
			display: flex;
			align-items: center;
			color: ${props => props.theme.colors.quinary};
			svg {
				color: ${props => props.theme.colors.primary};
				margin-right: 8px;
			}
		}
	}
`

export const Section = styled.div`
	margin-top: 48px;
	> strong {
		color: ${props => props.theme.colors.quinary};
		font-size: 20px;
		line-height: 26px;
		border-bottom: 1px solid ${props => props.theme.colors.secundary};
		display: block;
		padding-bottom: 16px;
		margin-bottom: 16px;
	}
`

export const Appointment = styled.div`
	display: flex;
	align-items: center;
	& + div {
		margin-top: 16px;
	}
	span {
		margin-left: auto;
		display: flex;
		align-items: center;
		color: ${props => props.theme.colors.tertiary};
		width: 70px;
		svg {
			color: ${props => props.theme.colors.primary};
			margin-right: 8px;
		}
	}
	div {
		flex: 1;
		background: ${props => props.theme.colors.secundary};
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-radius: 10px;
		margin-left: 24px;
		img {
			height: 56px;
			width: 56px;
			border-radius: 50%;
			object-fit: cover;
		}
		strong {
			margin-left: 24px;
			color: ${props => props.theme.colors.white};
			font-size: 20px;
		}
	}
`

export const Calendar = styled.aside`
	width: 380px;
	.DayPicker {
		background: ${props => props.theme.colors.senary};
		border-radius: 10px;
	}
	.DayPicker-wrapper {
		padding-bottom: 0;
	}
	.DayPicker,
	.DayPicker-Month {
		width: 100%;
	}
	.DayPicker-Month {
		border-collapse: separate;
		border-spacing: 8px;
		margin: 16px;
	}
	.DayPicker-Day {
		width: 40px;
		height: 40px;
	}
	.DayPicker-Day--available:not(.DayPicker-Day--outside) {
		background: ${props => props.theme.colors.secundary};
		border-radius: 10px;
		color: ${props => props.theme.colors.white};
	}
	.DayPicker:not(.DayPicker--interactionDisabled)
		.DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
		background: ${props => shade(0.2, props.theme.colors.secundary)};
	}
	.DayPicker-Day--today {
		font-weight: normal;
		color: ${props => props.theme.colors.primary};
	}
	.DayPicker-Day--disabled {
		color: ${props => props.theme.colors.octonary} !important;
		background: transparent !important;
	}
	.DayPicker-Day--selected {
		background: ${props => props.theme.colors.primary} !important;
		border-radius: 10px;
		color: ${props => props.theme.colors.quartenary} !important;
	}
`
