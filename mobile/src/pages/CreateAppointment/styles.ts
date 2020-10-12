import styled from 'styled-components/native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import {
	HourProps,
	HourTextProps,
	Provider,
	ProviderContainerProps,
	ProviderNameProps,
} from './types'

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	padding: 24px;
	padding-top: ${getStatusBarHeight() + 24}px;
	background: ${props => props.theme.colors.senary};

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const HeaderTitle = styled.Text`
	color: ${props => props.theme.colors.tertiary};
	font-family: ${props => props.theme.fonts.primary.medium};
	font-size: 20px;
	margin-left: 16px;
`

export const BackButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
	width: 56px;
	height: 56px;
	border-radius: 28px;
	margin-left: auto;
`

export const Content = styled.ScrollView``

export const ProvidersListContainer = styled.View`
	height: 112px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
	padding: 32px 24px;
`

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
	background: ${props =>
		props.selected ? props.theme.colors.primary : props.theme.colors.secundary};
	padding: 8px 12px;
	margin-right: 16px;
	border-radius: 10px;
	flex-direction: row;
	align-items: center;
`

export const ProviderAvatar = styled.Image`
	width: 32px;
	height: 32px;
	border-radius: 16px;
`

export const ProviderName = styled.Text<ProviderNameProps>`
	margin-left: 8px;
	font-family: ${props => props.theme.fonts.primary.medium};
	font-size: 16px;
	color: ${props =>
		props.selected
			? props.theme.colors.quartenary
			: props.theme.colors.tertiary};
`

export const CalendarContainer = styled.View``

export const CalendarTitle = styled.Text`
	font-family: ${props => props.theme.fonts.primary.medium};
	color: ${props => props.theme.colors.tertiary};
	font-size: 24px;
	margin: 0 24px 24px;
`

export const OpenDatePickerButton = styled(RectButton)`
	height: 46px;
	background: ${props => props.theme.colors.primary};
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	margin: 0 24px;
`

export const OpenDatePickerButtonText = styled.Text`
	font-family: ${props => props.theme.fonts.primary.medium};
	font-size: 16px;
	color: ${props => props.theme.colors.quartenary};
`

export const Schedule = styled.View`
	padding: 24px 0 16px;
	margin-left: 24px;
`

export const ScheduleTitle = styled.Text`
	color: ${props => props.theme.colors.tertiary};
	font-family: ${props => props.theme.fonts.primary.medium};
	font-size: 24px;
	margin-bottom: 10px;
`

export const Section = styled.View`
	margin-bottom: 24px;
`

export const SectionTitle = styled.Text`
	font-size: 18px;
	color: ${props => props.theme.colors.quinary};
	font-family: ${props => props.theme.fonts.primary.regular};
	margin: 12px 0;
`

export const SectionContent = styled.ScrollView.attrs({
	contentContarinerStyle: {
		paddingHorizontal: 24,
	},
	horizontal: true,
	showsHorizontalScrollIndicator: false,
})``

export const Hour = styled(RectButton)<HourProps>`
	padding: 12px;
	border-radius: 10px;
	margin-right: 8px;

	opacity: ${props => (props.available ? 1 : 0.3)};
	background: ${props =>
		props.selected ? props.theme.colors.primary : props.theme.colors.secundary};
`

export const HourText = styled.Text<HourTextProps>`
	font-family: ${props => props.theme.fonts.primary.regular};
	font-size: 16px;
	color: ${props =>
		props.selected
			? props.theme.colors.quartenary
			: props.theme.colors.tertiary};
`

export const CreateAppointmentButton = styled(RectButton)`
	height: 50px;
	background: ${props => props.theme.colors.primary};
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	margin: 0 24px 24px;
`

export const CreateAppointmentButtonText = styled.Text`
	font-family: ${props => props.theme.fonts.primary.medium};
	font-size: 18px;
	color: ${props => props.theme.colors.quartenary};
`
