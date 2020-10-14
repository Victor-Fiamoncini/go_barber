import { TextInputProps } from 'react-native'

export interface ContainerProps {
	isFocused: boolean
	isErrored: boolean
}

export interface InputProps extends TextInputProps {
	name: string
	icon: string
	// eslint-disable-next-line @typescript-eslint/ban-types
	containerStyle?: {}
}

export interface InputValueReference {
	value: string
}

export interface InputRef {
	focus(): void
}
