import { ParamListBase, RouteProp } from '@react-navigation/native'

export interface RouteParams extends RouteProp<ParamListBase, string> {
	date: number
}
