import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 0 24px;
`

export const Title = styled.Text`
	color: ${props => props.theme.colors.tertiary};
	font-family: ${props => props.theme.fonts.primary.medium};
	font-size: 32px;
	margin-top: 40px;
	text-align: center;
`

export const Description = styled.Text`
	color: ${props => props.theme.colors.quinary};
	font-family: ${props => props.theme.fonts.primary.regular};
	font-size: 18px;
	margin-top: 16px;
`

export const OkButton = styled(RectButton)`
	background: ${props => props.theme.colors.primary};
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	margin-top: 24px;
	padding: 12px 24px;
`

export const OkButtonText = styled.Text`
	color: ${props => props.theme.colors.background};
	font-family: ${props => props.theme.fonts.primary.medium};
	font-size: 18px;
`
