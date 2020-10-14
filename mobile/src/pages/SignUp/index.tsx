import React, { useCallback, useRef } from 'react'
import {
	Image,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Alert,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useTheme } from 'styled-components'

import getValidationErrors from '../../utils/getValidationErrors'
import apiClient from '../../services/apiClient'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import { SignUpFormData } from './types'

import {
	Container,
	BackToSignInButton,
	BackToSignInButtonText,
	Title,
} from './styles'

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const emailInputRef = useRef<TextInput>(null)
	const passwordInputRef = useRef<TextInput>(null)

	const { goBack } = useNavigation()
	const { colors } = useTheme()

	const handleSignUp = useCallback(async (data: SignUpFormData) => {
		try {
			formRef.current?.setErrors({})

			const schema = Yup.object().shape({
				name: Yup.string().required(),
				email: Yup.string().required().email(),
				password: Yup.string().min(6).required(),
			})

			await schema.validate(data, { abortEarly: false })

			await apiClient.post('/users', data)

			Alert.alert('Cadastro realizado com sucesso', 'Você já pode fazer login!')

			goBack()
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				formRef.current?.setErrors(errors)
				return
			}

			Alert.alert(
				'Erro no cadastro',
				'Ocorreu um erro ao fazer o cadastro, confira seus dados'
			)
		}
	}, [])

	return (
		<>
			<KeyboardAvoidingView
				enabled
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<ScrollView
					contentContainerStyle={{ flex: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					<Container>
						<Image source={logoImg} />
						<View>
							<Title>Crie sua conta</Title>
						</View>
						<Form onSubmit={handleSignUp} ref={formRef}>
							<Input
								name="name"
								icon="user"
								placeholder="Nome"
								autoCapitalize="words"
								onSubmitEditing={() => emailInputRef.current?.focus()}
							/>
							<Input
								ref={emailInputRef}
								name="email"
								icon="mail"
								placeholder="E-mail"
								keyboardType="email-address"
								autoCorrect={false}
								autoCapitalize="none"
								onSubmitEditing={() => passwordInputRef.current?.focus()}
							/>
							<Input
								ref={passwordInputRef}
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								textContentType="newPassword"
								returnKeyType="send"
								onSubmitEditing={() => formRef.current?.submitForm()}
							/>
						</Form>
						<Button onPress={() => formRef.current?.submitForm()}>
							Entrar
						</Button>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			<BackToSignInButton onPress={() => goBack()}>
				<Feather name="arrow-left" size={20} color={colors.white} />
				<BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
			</BackToSignInButton>
		</>
	)
}

export default SignUp
