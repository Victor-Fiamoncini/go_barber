import React, { useCallback, useMemo, useRef } from 'react'
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useTheme } from 'styled-components'

import { useAuth } from '../../context/AuthContext'
import getValidationErrors from '../../utils/getValidationErrors'
import apiClient from '../../services/apiClient'

import defaultAvatar from '../../assets/default-avatar.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { UpdateProfileFormData } from './types'

import {
	Container,
	Title,
	UserAvatarButton,
	UserAvatar,
	BackButton,
} from './styles'

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const emailInputRef = useRef<TextInput>(null)
	const oldPasswordInputRef = useRef<TextInput>(null)
	const passwordInputRef = useRef<TextInput>(null)
	const confirmPasswordInputRef = useRef<TextInput>(null)

	const { user, updateUser } = useAuth()
	const { colors } = useTheme()
	const { goBack } = useNavigation()

	const userAvatar = useMemo(() => {
		return user.avatar_url ? { uri: user.avatar_url } : defaultAvatar
	}, [user.avatar_url])

	const handleUpdateProfile = useCallback(
		async (data: UpdateProfileFormData) => {
			try {
				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					name: Yup.string().required(),
					email: Yup.string().required().email(),
					old_password: Yup.string().nullable(true).notRequired(),
					password: Yup.string().nullable(true).notRequired(),
					password_confirmation: Yup.string().oneOf([Yup.ref('password')]),
				})

				await schema.validate(data, { abortEarly: false })

				const {
					name,
					email,
					password,
					old_password,
					password_confirmation,
				} = data

				const formData = Object.assign(
					{
						name,
						email,
					},
					old_password && {
						password,
						old_password,
						password_confirmation,
					}
				)

				const response = await apiClient.put('/profile', formData)

				updateUser(response.data)

				Alert.alert(
					'Cadastro atualizado com sucesso',
					'Suas informações foram atualizadas com sucesso!'
				)

				goBack()
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)
					return
				}

				Alert.alert(
					'Erro ao atualizar o cadastro',
					'Ocorreu um erro ao atualizar o seu cadastro, confira seus dados'
				)
			}
		},
		[]
	)

	const handleGoBack = useCallback(() => {
		goBack()
	}, [goBack])

	return (
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
					<BackButton onPress={handleGoBack}>
						<Feather name="chevron-left" size={24} color={colors.quinary} />
					</BackButton>
					<UserAvatarButton>
						<UserAvatar source={userAvatar} />
					</UserAvatarButton>
					<View>
						<Title>Meu perfil</Title>
					</View>
					<Form
						ref={formRef}
						onSubmit={handleUpdateProfile}
						initialData={{ name: user.name, email: user.email }}
					>
						<Input
							name="name"
							icon="user"
							placeholder="Nome"
							autoCapitalize="words"
							returnKeyType="next"
							defaultValue={user.name}
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
							returnKeyType="next"
							defaultValue={user.email}
							onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
						/>
						<Input
							ref={oldPasswordInputRef}
							name="old_password"
							icon="lock"
							placeholder="Senha atual"
							secureTextEntry
							textContentType="newPassword"
							containerStyle={{ marginTop: 16 }}
							returnKeyType="next"
							onSubmitEditing={() => passwordInputRef.current?.focus()}
						/>
						<Input
							ref={passwordInputRef}
							name="password"
							icon="lock"
							placeholder="Nova senha"
							secureTextEntry
							textContentType="newPassword"
							returnKeyType="next"
							onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
						/>
						<Input
							ref={confirmPasswordInputRef}
							name="password_confirmation"
							icon="lock"
							placeholder="Confirmação de senha"
							secureTextEntry
							textContentType="newPassword"
							returnKeyType="send"
							onSubmitEditing={() => formRef.current?.submitForm()}
						/>
					</Form>
					<Button onPress={() => formRef.current?.submitForm()}>
						Confirmar mudanças
					</Button>
				</Container>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default Profile
