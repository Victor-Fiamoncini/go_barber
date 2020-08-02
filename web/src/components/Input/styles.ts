import styled from 'styled-components'

export const Container = styled.div`
	background: #232129;
	border-radius: 10px;
	border: 2px solid #232129;
	padding: 16px;
	width: 100%;
	display: flex;
	align-items: center;
	color: #666360;
	margin-top: 8px;
	svg {
		margin-right: 16px;
	}
	input {
		color: #f4ede8;
		flex: 1;
		background: transparent;
		border: 0;
		&::placeholder {
			color: #666360;
		}
	}
`
