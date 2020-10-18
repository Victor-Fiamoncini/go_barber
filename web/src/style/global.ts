import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline: none;
		box-sizing: border-box;
		font-size: 16px;
	}

	body {
		background: ${props => props.theme.colors.background};
		color: ${props => props.theme.colors.white};
		-webkit-font-smoothing: antialiased;
	}

	body,
	input,
	button {
		font-family: ${props => props.theme.fonts.primary}, serif;
		font-size: 16px;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	strong {
		font-weight: 500;
	}

	button {
		cursor: pointer;
	}

	a {
		text-decoration: none;
	}
`
