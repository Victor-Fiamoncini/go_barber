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

import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import {
	Container,
	CreateAccountButton,
	CreateAccountButtonText,
	ForgotPassword,
	ForgotPasswordText,
	Title,
} from './styles'
import { useAuth } from '../../context/AuthContext'

interface SignInFormData {
	email: string
	password: string
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const passwordInputRef = useRef<TextInput>(null)

	const navigation = useNavigation()
	const { signIn, user } = useAuth()

	const handleSignIn = useCallback(async (data: SignInFormData) => {
		try {
			formRef.current?.setErrors({})

			const schema = Yup.object().shape({
				email: Yup.string()
					.required('Email obrigatório')
					.email('Digite um e-mail válido'),
				password: Yup.string().required('Senha obrigatória'),
			})

			await schema.validate(data, { abortEarly: false })

			const { email, password } = data

			await signIn({ email, password })

			console.log(user)
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				formRef.current?.setErrors(errors)

				return
			}

			Alert.alert(
				'Erro na autenticação',
				'Ocorreu um erro ao fazer login, confira suas credenciais'
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
							<Title>Faça seu logon</Title>
						</View>
						<Form ref={formRef} onSubmit={handleSignIn}>
							<Input
								name="email"
								icon="mail"
								placeholder="E-mail"
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={() => passwordInputRef.current?.focus()}
							/>
							<Input
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								returnKeyType="send"
								ref={passwordInputRef}
								onSubmitEditing={() => formRef.current?.submitForm()}
							/>
						</Form>
						<Button onPress={() => formRef.current?.submitForm()}>
							Entrar
						</Button>
						<ForgotPassword>
							<ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
						</ForgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			<CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
				<Feather name="log-in" size={20} color="#ff9000" />
				<CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
			</CreateAccountButton>
		</>
	)
}

export default SignIn
