import React, { useCallback, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

import api from '../../services/apiClient'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Content, AvatarInput } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface ProfileFormData {
	name: string
	email: string
	password: string
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const history = useHistory()

	const { user } = useAuth()
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
					password: Yup.string().min(6, 'No mínimo 6 digitos'),
				})

				await schema.validate(data, { abortEarly: false })

				await api.post('/users', data)

				history.push('/')

				addToast({
					type: 'success',
					title: 'Cadastro realizado!',
					description: 'Você já pode fazer seu logon no GoBarber!',
				})
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)
					return
				}

				addToast({
					type: 'error',
					title: 'Erro na autenticação',
					description: 'Ocorreu um erro ao fazer o cadastro, confira os campos',
				})
			}
		},
		[addToast, history]
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
						<img src={user.avatar_url} alt={user.name} />
						<button type="button">
							<FiCamera />
						</button>
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
