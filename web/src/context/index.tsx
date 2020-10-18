import React from 'react'

import { ThemeProvider } from './ThemeContext'
import { AuthProvider } from './AuthContext'
import { ToastProvider } from './ToastContext'

const AppProvider: React.FC = ({ children }) => (
	<ThemeProvider>
		<AuthProvider>
			<ToastProvider>{children}</ToastProvider>
		</AuthProvider>
	</ThemeProvider>
)

export default AppProvider
