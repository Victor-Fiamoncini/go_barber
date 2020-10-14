import React, {
	useState,
	useEffect,
	useImperativeHandle,
	useRef,
	forwardRef,
	useCallback,
} from 'react'
import { useTheme } from 'styled-components'
import { useField } from '@unform/core'

import { InputProps, InputRef, InputValueReference } from './types'

import { Container, TextInput, Icon } from './styles'

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
	{ name, icon, containerStyle = {}, ...rest },
	ref
) => {
	const inputElementRef = useRef<any>(null)

	const { registerField, defaultValue, fieldName, error } = useField(name)

	const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)

	const { colors } = useTheme()

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)

		setIsFilled(Boolean(inputValueRef.current.value))
	}, [])

	useImperativeHandle(ref, () => ({
		focus() {
			inputElementRef.current.focus()
		},
	}))

	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputValueRef.current,
			path: 'value',
			setValue(ref: any, value) {
				inputValueRef.current.value = value
				inputElementRef.current.setNativeProps({ text: value })
			},
			clearValue() {
				inputValueRef.current.value = ''
				inputElementRef.current.clear()
			},
		})
	}, [registerField, fieldName])

	return (
		<Container
			style={containerStyle}
			isFocused={isFocused}
			isErrored={Boolean(error)}
		>
			<Icon
				name={icon}
				size={20}
				color={isFocused || isFilled ? colors.primary : colors.octonary}
			/>

			<TextInput
				ref={inputElementRef}
				placeholderTextColor={colors.octonary}
				keyboardAppearance="dark"
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onChangeText={value => {
					inputValueRef.current.value = value
				}}
				{...rest}
			/>
		</Container>
	)
}
export default forwardRef(Input)
