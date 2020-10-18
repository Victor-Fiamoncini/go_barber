import React from 'react'
import { Route as ReactRoute, Redirect } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import { RouteProps } from './types'

const Route: React.FC<RouteProps> = ({
	isPrivate = false,
	component: Component,
	...rest
}) => {
	const { user } = useAuth()

	return (
		<ReactRoute
			{...rest}
			render={({ location }) => {
				return isPrivate === !!user ? (
					<Component />
				) : (
					<Redirect
						to={{
							pathname: isPrivate ? '/' : '/dashboard',
							state: {
								from: location,
							},
						}}
					/>
				)
			}}
		/>
	)
}

export default Route
