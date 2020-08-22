import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'

const Routes = () => (
	<Switch>
		<Route path="/" exact component={SignIn} />
		<Route path="/signup" component={SignUp} />
		<Route path="/forgot-password" component={ForgotPassword} />
		<Route isPrivate path="/dashboard" component={Dashboard} />
	</Switch>
)

export default Routes
