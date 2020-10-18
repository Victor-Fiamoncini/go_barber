import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'
import { useTheme } from 'styled-components'

import { InputProps } from './types'

import { Container, Error } from './styles'

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const { colors } = useTheme()
	const { fieldName, defaultValue, error, registerField } = useField(name)

	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)

		setIsFilled(!!inputRef.current?.value)
	}, [])

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		})
	}, [fieldName, registerField])

	return (
		<Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
			{Icon && <Icon size={20} />}
			<input
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				ref={inputRef}
				defaultValue={defaultValue}
				{...rest}
			/>
			{error && (
				<Error title={error}>
					<FiAlertCircle color={colors.septenary} size={20} />
				</Error>
			)}
		</Container>
	)
}

export default Input
