import React, { ChangeEvent, useCallback, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

import apiClient from '../../services/apiClient'
import getValidationErrors from '../../utils/getValidationErrors'
import defaultAvatar from '../../assets/default-avatar.png'

import { Container, Content, AvatarInput } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { ProfileFormData } from './types'

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

				apiClient.put('/profile', formData).then(response => {
					updateUser(response.data)

					history.push('/')
				})

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
		[addToast, history.push, updateUser]
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
		[apiClient, addToast, updateUser]
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
					<Input name="name" type="text" icon={FiUser} placeholder="Nome" />
					<Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
					<br />
					<Input
						name="old_password"
						type="password"
						icon={FiLock}
						placeholder="Senha atual"
					/>
					<Input
						name="password"
						type="password"
						icon={FiLock}
						placeholder="Nova senha"
					/>
					<Input
						name="password_confirmation"
						type="password"
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
