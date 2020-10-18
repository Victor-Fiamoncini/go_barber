import { RouteProps as ReactRouteProps } from 'react-router-dom'

export interface RouteProps extends ReactRouteProps {
	isPrivate?: boolean
	component: React.ComponentType
}
