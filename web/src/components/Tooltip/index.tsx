import React from 'react'

import { TooltipProps } from './types'

import { Container } from './styles'

const Tooltip: React.FC<TooltipProps> = ({ children, className, title }) => (
	<Container className={className}>
		{children}
		<span>{title}</span>
	</Container>
)

export default Tooltip
