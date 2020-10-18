import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AppProvider from './context'
import Wrapper from './Wrapper'

const App: React.FC = () => (
	<Router>
		<AppProvider>
			<Wrapper />
		</AppProvider>
	</Router>
)

export default App
