import React from 'react'

import { ButtonProps } from './types'

import { Container } from './styles'

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
	<Container type="button" {...rest}>
		{loading ? 'Carregando...' : children}
	</Container>
)

export default Button
