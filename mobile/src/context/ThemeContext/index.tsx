import React from 'react'
import { ThemeProvider as Theme } from 'styled-components'

import defaultTheme from '../../style/themes/default'

export const ThemeProvider: React.FC = ({ children }) => {
	return <Theme theme={defaultTheme}>{children}</Theme>
}
