import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
	width: 100%;
	height: 60px;
	background: ${props => props.theme.colors.primary};
	border-radius: 10px;
	margin-top: 8px;
	justify-content: center;
	align-items: center;
`

export const ButtonText = styled.Text`
	font-family: ${props => props.theme.fonts.primary.medium};
	color: ${props => props.theme.colors.background};
	font-size: 18px;
`
