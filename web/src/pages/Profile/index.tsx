import React, { ChangeEvent, useCallback, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

import api from '../../services/apiClient'
import getValidationErrors from '../../utils/getValidationErrors'
import defaultAvatar from '../../assets/default-avatar.png'

import { Container, Content, AvatarInput } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
import apiClient from '../../services/apiClient'

interface ProfileFormData {
	name: string
	email: string
	old_password: string
	password: string
	password_confirmation: string
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const history = useHistory()

	const { user, updateUser } = useAuth()
	const { addToast } = useToast()

	const handleSubmit = useCallback(
		async (data: ProfileFormData) => {
			try {
				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um e-mail válido'),
					old_password: Yup.string().nullable(true).notRequired(),
					password: Yup.string().nullable(true).notRequired(),
					password_confirmation: Yup.string().oneOf(
						[Yup.ref('password')],
						'Confirmação incorreta'
					),
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

				const response = await api.put('/profile', formData)

				updateUser(response.data)

				history.push('/')

				addToast({
					type: 'success',
					title: 'Cadastro atualizado!',
					description: 'Suas informações foram atualizadas com sucesso!',
				})
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)
					return
				}

				addToast({
					type: 'error',
					title: 'Erro ao atualizar cadastro',
					description:
						'Ocorreu um erro ao atualizar o cadastro, confira os campos',
				})
			}
		},
		[addToast, history]
	)

	const handleAvatarChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (event.target.files) {
				const data = new FormData()

				data.append('avatar', event.target.files[0])

				apiClient.patch('/users/avatar', data).then(response => {
					updateUser(response.data)

					addToast({
						type: 'success',
						title: 'Avatar atualizado!',
					})
				})
			}
		},
		[apiClient, addToast]
	)

	return (
		<Container>
			<header>
				<div>
					<Link to="/dashboard">
						<FiArrowLeft />
					</Link>
				</div>
			</header>
			<Content>
				<Form
					ref={formRef}
					onSubmit={handleSubmit}
					initialData={{ name: user.name, email: user.email }}
				>
					<AvatarInput>
						<img
							src={user.avatar_url ? user.avatar_url : defaultAvatar}
							alt={user.name}
						/>
						<label htmlFor="avatar">
							<FiCamera />
							<input type="file" id="avatar" onChange={handleAvatarChange} />
						</label>
					</AvatarInput>
					<h1>Meu perfil</h1>
					<Input name="name" icon={FiUser} placeholder="Nome" />
					<Input name="email" icon={FiMail} placeholder="E-mail" />
					<br />
					<Input name="old_password" icon={FiLock} placeholder="Senha atual" />
					<Input name="password" icon={FiLock} placeholder="Nova senha" />
					<Input
						name="password_confirmation"
						icon={FiLock}
						placeholder="Confirmar senha"
					/>
					<Button type="submit">Confirmar mudanças</Button>
				</Form>
			</Content>
		</Container>
	)
}

export default Profile
