import { ParamListBase, RouteProp } from '@react-navigation/native'

export interface Provider {
	id: string
	name: string
	avatar_url: string
}

export interface RouteParams extends RouteProp<ParamListBase, string> {
	providerId: string
}

export interface ProviderContainerProps {
	selected: boolean
}

export interface ProviderNameProps {
	selected: boolean
}

export interface AvailabilityItem {
	hour: number
	available: boolean
}

export interface HourProps {
	available: boolean
	selected: boolean
}

export interface HourTextProps {
	selected: boolean
}
